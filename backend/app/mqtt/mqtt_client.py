"""
MQTT subscriber — connects to the Mosquitto broker, listens on the sensor
topic, and on each message: validates with SensorPayloadV1, saves to DB,
runs it through the rule engine, stores the prediction, and prints an
alert if the result isn't "normal".
"""
import json
import paho.mqtt.client as mqtt

from app.schemas.sensor_data import SensorPayloadV1
from app.db.session import SessionLocal
from app.models.sensor_data import SensorData
from app.models.prediction import Prediction
from app.ai.rule_based import classify

MQTT_BROKER_HOST = "localhost"
MQTT_BROKER_PORT = 1883
MQTT_TOPIC = "tree/sensor-data"


def save_reading(reading: SensorPayloadV1):
    """Writes one validated reading, classifies it, and stores the prediction."""
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
        db.merge(row)
        db.commit()
        print(f"Saved reading from {reading.device_id} at {reading.timestamp}")

        # --- Phase 2: classify and store the prediction ---
        result = classify(reading)
        is_alert = 0 if result.condition == "normal" else 1

        prediction = Prediction(
            device_id=reading.device_id,
            timestamp=reading.timestamp,
            condition=result.condition,
            reason=result.reason,
            is_alert=is_alert,
        )
        db.add(prediction)
        db.commit()

        if is_alert:
            print(f"🚨 ALERT [{result.condition.upper()}] {reading.device_id}: {result.reason}")
        else:
            print(f"Classified as: {result.condition}")

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
        reading = SensorPayloadV1(**data)
        save_reading(reading)
    except Exception as e:
        print(f"Rejected message: {e} | raw payload: {raw}")


def start_mqtt_client():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
    client.loop_start()
    return client