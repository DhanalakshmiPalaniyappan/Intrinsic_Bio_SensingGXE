"""
Sensor payload contract — v1 (FROZEN)

This Pydantic model is the software-side mirror of payload_schema_v1.json.
It is the single source of truth your FastAPI ingestion endpoint uses to
validate every incoming MQTT/HTTP message from the ESP32.

DO NOT edit field names/types after both sides sign off on v1.
If the hardware side needs a new field or a changed unit, that is a v2 —
create a new class (SensorPayloadV2) rather than silently mutating this one,
so old and new devices can both be supported during a transition.
"""

from datetime import datetime, timezone
from pydantic import BaseModel, ConfigDict, Field, field_validator


class SensorPayloadV1(BaseModel):
    device_id: str = Field(..., description="Unique per ESP32 device, e.g. 'esp32-01'")
    timestamp: datetime = Field(..., description="ISO 8601, must be UTC")
    bioelectric_mv: float = Field(..., description="Raw bioelectric signal, millivolts")
    soil_moisture: float = Field(..., ge=0, le=100, description="Percent, 0-100")
    temperature_c: float = Field(..., description="Degrees Celsius")
    humidity: float = Field(..., ge=0, le=100, description="Percent, 0-100")

    @field_validator("timestamp")
    @classmethod
    def must_be_utc(cls, v: datetime) -> datetime:
        if v.tzinfo is None:
            raise ValueError("timestamp must include timezone info (UTC, e.g. ...Z)")
        if v.utcoffset() != timezone.utc.utcoffset(v):
            raise ValueError("timestamp must be UTC")
        return v

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "device_id": "esp32-01",
                "timestamp": "2026-08-26T10:00:00Z",
                "bioelectric_mv": 12.4,
                "soil_moisture": 34.2,
                "temperature_c": 29.1,
                "humidity": 61.0,
            }
        }
    )