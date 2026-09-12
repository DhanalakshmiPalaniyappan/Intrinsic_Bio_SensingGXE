"""
Sensor data read endpoints.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional

from app.db.session import get_db
from app.models.sensor_data import SensorData
from app.schemas.sensor_data_response import SensorDataResponse

router = APIRouter(prefix="/sensors", tags=["sensors"])


@router.get("/latest", response_model=list[SensorDataResponse])
def get_latest_readings(
    device_id: Optional[str] = Query(None, description="Filter by device"),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Returns the most recent N sensor readings, optionally filtered by device."""
    query = db.query(SensorData).order_by(desc(SensorData.timestamp))
    if device_id:
        query = query.filter(SensorData.device_id == device_id)
    return query.limit(limit).all()