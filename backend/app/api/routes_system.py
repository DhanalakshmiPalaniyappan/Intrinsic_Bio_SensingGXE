"""
System health check — used by the frontend's System Health panel.
"""
from fastapi import APIRouter
from datetime import datetime, timezone
from sqlalchemy import text

from app.db.session import engine
from app.mqtt.mqtt_client import mqtt_client_instance

router = APIRouter(prefix="/system", tags=["system"])


@router.get("/health")
def system_health():
    # Database check
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception:
        db_status = "down"

    # MQTT check
    mqtt_status = "connected" if mqtt_client_instance and mqtt_client_instance.is_connected() else "disconnected"

    # AI model check — classify() is always loaded if this module imported without error
    try:
        from app.ai.rule_based import classify  # noqa: F401
        ai_status = "ready"
    except Exception:
        ai_status = "error"

    overall = "operational" if db_status == "healthy" and mqtt_status == "connected" and ai_status == "ready" else "degraded"

    return {
        "database": db_status,
        "mqtt": mqtt_status,
        "ai_model": ai_status,
        "fastapi": "online",  # if this endpoint responded, FastAPI is obviously online
        "last_checked": datetime.now(timezone.utc).isoformat(),
        "overall_status": overall,
    }