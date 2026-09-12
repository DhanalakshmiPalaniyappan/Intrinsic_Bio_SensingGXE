"""
SensorData — this table becomes a TimescaleDB hypertable in Day 3.
Column names here match your frozen payload contract (payload_schema_v1.json):
bioelectric_mv, soil_moisture, temperature_c, humidity.

Note: no separate `id` primary key — TimescaleDB hypertables work best with
a composite key that includes the timestamp (used for partitioning).
"""
from sqlalchemy import Column, String, DateTime, Float
from app.db.base import Base


class SensorData(Base):
    __tablename__ = "sensor_data"

    device_id = Column(String, primary_key=True, nullable=False)
    timestamp = Column(DateTime(timezone=True), primary_key=True, nullable=False)
    bioelectric_mv = Column(Float, nullable=False)
    soil_moisture = Column(Float, nullable=False)
    temperature_c = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)