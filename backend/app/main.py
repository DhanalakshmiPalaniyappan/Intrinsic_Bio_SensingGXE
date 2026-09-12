from fastapi import FastAPI
from app.config import DATABASE_URL
from app.mqtt.mqtt_client import start_mqtt_client
from app.api.routes_sensor_data import router as sensor_data_router

app = FastAPI(title="Intrinsic Bio-Sensing of Trees API")

app.include_router(sensor_data_router)

mqtt_client = None


@app.on_event("startup")
def startup_event():
    global mqtt_client
    mqtt_client = start_mqtt_client()


@app.on_event("shutdown")
def shutdown_event():
    if mqtt_client:
        mqtt_client.loop_stop()
        mqtt_client.disconnect()


@app.get("/health")
def health_check():
    return {"status": "ok"}