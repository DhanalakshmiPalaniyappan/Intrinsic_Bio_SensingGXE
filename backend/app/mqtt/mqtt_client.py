"""
MQTT subscriber — connects to the Mosquitto broker, listens on the sensor
topic, and on each message: validates with SensorPayloadV1, then saves to DB.

This runs as a background thread started from main.py (see below), so FastAPI
can serve HTTP requests *and* listen for MQTT messages at the same time.
"""
import json
import paho.mqtt.client as mqtt

from app.schemas.sensor_data import SensorPayloadV1
from app.db.session import SessionLocal
from app.models.sensor_data import SensorData

MQTT_BROKER_HOST = "localhost"
MQTT_BROKER_PORT = 1883
MQTT_TOPIC = "tree/sensor-data"


def save_reading(reading: SensorPayloadV1):
    """Writes one validated reading into the sensor_data hypertable."""
    db = SessionLocal()
    try:
        row = SensorData(
            device_id=reading.device_id,
            timestamp=reading.timestamp,
            bioelectric_mv=reading.bioelectric_mv,
            soil_moisture=reading.soil_moisture,
            temperature_c=reading.temperature_c,
            humidity=reading.humidity,
        )
        db.merge(row)  # merge, not add: safe if same device_id+timestamp arrives twice
        db.commit()
        print(f"Saved reading from {reading.device_id} at {reading.timestamp}")
    except Exception as e:
        db.rollback()
        print(f"DB write failed: {e}")
    finally:
        db.close()


def on_connect(client, userdata, flags, reason_code, properties=None):
    print(f"MQTT connected (code {reason_code}), subscribing to '{MQTT_TOPIC}'")
    client.subscribe(MQTT_TOPIC)


def on_message(client, userdata, msg):
    raw = msg.payload.decode()
    try:
        data = json.loads(raw)
        reading = SensorPayloadV1(**data)  # Pydantic validates here
        save_reading(reading)
    except Exception as e:
        # Bad/malformed data gets logged and dropped, not crashed on
        print(f"Rejected message: {e} | raw payload: {raw}")


def start_mqtt_client():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
    client.loop_start()  # runs in background thread, doesn't block FastAPI
    return client