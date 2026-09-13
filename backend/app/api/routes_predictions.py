"""
Predictions endpoint — returns recent AI classification history for
the Analytics page, most recent first.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.prediction import Prediction

router = APIRouter(prefix="/predictions", tags=["predictions"])


@router.get("")
def list_predictions(
    limit: int = Query(50, ge=1, le=500),
    device_id: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Prediction).order_by(Prediction.timestamp.desc())
    if device_id:
        query = query.filter(Prediction.device_id == device_id)

    rows = query.limit(limit).all()

    return [
        {
            "device_id": p.device_id,
            "timestamp": p.timestamp.isoformat(),
            "condition": p.condition,
            "reason": p.reason,
            "is_alert": p.is_alert,
        }
        for p in rows
    ]