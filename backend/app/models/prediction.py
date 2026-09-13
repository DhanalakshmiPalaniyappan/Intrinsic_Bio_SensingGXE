"""
Stores the AI rule engine's classification result for each sensor reading.
Kept as its own table (not merged into sensor_data) so raw readings and
their AI-derived interpretation stay cleanly separated.
"""
from sqlalchemy import Column, Integer, String, DateTime, Text
from app.db.base import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), nullable=False, index=True)
    condition = Column(String, nullable=False)  # normal | heat_stress | fire_risk | illegal_cutting
    reason = Column(Text, nullable=False)        # human-readable explanation
    is_alert = Column(Integer, nullable=False, default=0)  # 0 = normal, 1 = triggers alert