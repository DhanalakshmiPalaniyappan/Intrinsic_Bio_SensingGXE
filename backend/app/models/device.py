from sqlalchemy import Column, Integer, String, DateTime, Float
from app.db.base import Base


class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    esp32_id = Column(String, unique=True, nullable=False, index=True)
    firmware = Column(String, nullable=True)
    battery = Column(Float, nullable=True)
    status = Column(String, default="unknown")  # e.g. "online", "offline"
    last_seen = Column(DateTime(timezone=True), nullable=True)