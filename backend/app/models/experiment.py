from sqlalchemy import Column, Integer, String, DateTime, Text
from app.db.base import Base


class Experiment(Base):
    __tablename__ = "experiments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    stress_type = Column(String, nullable=True)  # e.g. "heat_stress", "fire_risk"
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)