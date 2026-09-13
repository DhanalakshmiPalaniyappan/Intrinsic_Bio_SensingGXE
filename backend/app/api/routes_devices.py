"""
Devices endpoint — reports each distinct device seen in SensorData,
with online/offline status based on how recently it last reported.
"""
from datetime import datetime, timezone, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.sensor_data import SensorData

router = APIRouter(prefix="/devices", tags=["devices"])

OFFLINE_THRESHOLD_SECONDS = 30  # no reading in this window => offline


@router.get("")
def list_devices(db: Session = Depends(get_db)):
    # Latest timestamp per device_id
    rows = (
        db.query(SensorData.device_id, func.max(SensorData.timestamp).label("last_seen"))
        .group_by(SensorData.device_id)
        .all()
    )

    now = datetime.now(timezone.utc)
    result = []
    for device_id, last_seen in rows:
        ts = last_seen if last_seen.tzinfo else last_seen.replace(tzinfo=timezone.utc)
        is_online = (now - ts) <= timedelta(seconds=OFFLINE_THRESHOLD_SECONDS)
        result.append({
            "device_id": device_id,
            "status": "online" if is_online else "offline",
            "last_seen": ts.isoformat(),
        })

    return sorted(result, key=lambda d: d["device_id"])