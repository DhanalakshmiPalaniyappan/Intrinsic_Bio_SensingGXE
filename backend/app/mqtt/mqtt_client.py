"""
MQTT subscriber — connects to the Mosquitto broker, listens on the sensor
topic, and on each message: validates, saves, classifies, stores prediction,
and broadcasts the result to connected WebSocket clients.
"""
import json
import asyncio
import paho.mqtt.client as mqtt

from app.schemas.sensor_data import SensorPayloadV1
from app.db.session import SessionLocal
from app.models.sensor_data import SensorData
from app.models.prediction import Prediction
from app.ai.rule_based import classify

MQTT_BROKER_HOST = "localhost"
MQTT_BROKER_PORT = 1883
MQTT_TOPIC = "tree/sensor-data"

mqtt_client_instance = None
main_event_loop = None  # set from main.py on startup, needed to broadcast from MQTT's own thread


def save_reading(reading: SensorPayloadV1):
    """Writes one validated reading, classifies it, stores prediction, and broadcasts live update."""
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

        # Broadcast to WebSocket clients
        if main_event_loop:
            from app.api.routes_websocket import broadcast_reading
            payload = {
                "device_id": reading.device_id,
                "timestamp": reading.timestamp.isoformat(),
                "bioelectric_mv": reading.bioelectric_mv,
                "soil_moisture": reading.soil_moisture,
                "temperature_c": reading.temperature_c,
                "humidity": reading.humidity,
                "condition": result.condition,
                "reason": result.reason,
                "is_alert": is_alert,
            }
            asyncio.run_coroutine_threadsafe(broadcast_reading(payload), main_event_loop)

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
    global mqtt_client_instance
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    try:
        client.connect_async(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
        client.loop_start()
        print(f"MQTT client attempting async connection to {MQTT_BROKER_HOST}:{MQTT_BROKER_PORT}")
    except Exception as e:
        print(f"Warning: Could not connect to MQTT broker ({e}). Simulation & REST APIs will continue working.")
    mqtt_client_instance = client
    return client