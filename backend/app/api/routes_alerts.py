"""
Alerts read endpoint — returns recent non-normal predictions.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.session import get_db
from app.models.prediction import Prediction

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("/latest")
def get_latest_alerts(limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    rows = (
        db.query(Prediction)
        .filter(Prediction.is_alert == 1)
        .order_by(desc(Prediction.timestamp))
        .limit(limit)
        .all()
    )
    return [
        {
            "device_id": r.device_id,
            "timestamp": r.timestamp,
            "condition": r.condition,
            "reason": r.reason,
        }
        for r in rows
    ]