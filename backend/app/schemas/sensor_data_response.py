"""
Response schema for reading sensor data back out via the API.
Kept separate from SensorPayloadV1 (the input contract) since responses
may later include extra fields (like classification results) that
incoming ESP32 data never carries.
"""
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class SensorDataResponse(BaseModel):
    device_id: str
    timestamp: datetime
    bioelectric_mv: float
    soil_moisture: float
    temperature_c: float
    humidity: float

    model_config = ConfigDict(from_attributes=True)