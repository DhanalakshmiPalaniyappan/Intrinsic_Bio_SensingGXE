import asyncio
import random
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import DATABASE_URL
from app.mqtt import mqtt_client as mqtt_module
from app.mqtt.mqtt_client import start_mqtt_client, save_reading
from app.schemas.sensor_data import SensorPayloadV1

from app.api.routes_sensor_data import router as sensor_data_router
from app.api.routes_alerts import router as alerts_router
from app.api.routes_system import router as system_router
from app.api.routes_auth import router as auth_router
from app.api.routes_websocket import router as websocket_router
from app.api.routes_devices import router as devices_router
from app.api.routes_predictions import router as predictions_router

app = FastAPI(title="Intrinsic Bio-Sensing of Trees API")

@app.get("/")
def root():
    return {"message": "Intrinsic Bio-Sensing API is running", "docs": "/docs"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor_data_router)
app.include_router(alerts_router)
app.include_router(system_router)
app.include_router(auth_router)
app.include_router(websocket_router)
app.include_router(devices_router)
app.include_router(predictions_router)

mqtt_client = None


@app.on_event("startup")
def startup_event():
    global mqtt_client
    mqtt_module.main_event_loop = asyncio.get_event_loop()
    mqtt_client = start_mqtt_client()


@app.on_event("shutdown")
def shutdown_event():
    if mqtt_client:
        mqtt_client.loop_stop()
        mqtt_client.disconnect()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/simulate")
def simulate_reading(condition: str = "normal", device_id: str = "esp32-01"):
    """Fires one synthetic reading through the real pipeline — for demo control."""
    presets = {
        "normal": {"bioelectric_mv": round(random.uniform(8, 18), 2), "soil_moisture": round(random.uniform(30, 55), 2), "temperature_c": round(random.uniform(28, 34), 2), "humidity": round(random.uniform(50, 70), 2)},
        "heat_stress": {"bioelectric_mv": round(random.uniform(1, 4), 2), "soil_moisture": round(random.uniform(20, 40), 2), "temperature_c": round(random.uniform(36, 42), 2), "humidity": round(random.uniform(40, 60), 2)},
        "fire_risk": {"bioelectric_mv": round(random.uniform(8, 15), 2), "soil_moisture": round(random.uniform(5, 15), 2), "temperature_c": round(random.uniform(41, 48), 2), "humidity": round(random.uniform(5, 18), 2)},
        "illegal_cutting": {"bioelectric_mv": round(random.uniform(35, 60), 2), "soil_moisture": round(random.uniform(20, 40), 2), "temperature_c": round(random.uniform(28, 33), 2), "humidity": round(random.uniform(50, 65), 2)},
    }
    values = presets.get(condition, presets["normal"])
    reading = SensorPayloadV1(
        device_id=device_id,
        timestamp=datetime.now(timezone.utc),
        **values,
    )
    save_reading(reading)
    return {"status": "sent", "condition": condition, "values": values}