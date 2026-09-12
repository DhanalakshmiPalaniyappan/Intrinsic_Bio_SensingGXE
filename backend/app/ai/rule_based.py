"""
Rule-based classifier — v1 (placeholder thresholds)

This turns one sensor reading (a SensorPayloadV1) into a condition label.
Thresholds below are PLACEHOLDERS — replace them with the real numbers from
your decision_table_v1.md once your bio teammate fills it in and you both freeze it.
"""

from dataclasses import dataclass
from app.schemas.sensor_data import SensorPayloadV1


# --- PLACEHOLDER THRESHOLDS: replace with values from decision_table_v1.md ---
NORMAL_MV_RANGE = (5.0, 20.0)          # TODO: bio teammate's baseline range
HEAT_STRESS_MV_DROP_BELOW = 5.0        # TODO
HEAT_STRESS_TEMP_ABOVE = 35.0          # TODO
FIRE_RISK_TEMP_ABOVE = 40.0            # TODO
FIRE_RISK_HUMIDITY_BELOW = 20.0        # TODO
CUTTING_MV_SPIKE_ABS = 30.0            # TODO


@dataclass
class ClassificationResult:
    condition: str
    reason: str


def classify(reading: SensorPayloadV1) -> ClassificationResult:
    mv = reading.bioelectric_mv
    temp = reading.temperature_c
    humidity = reading.humidity

    if abs(mv) > CUTTING_MV_SPIKE_ABS:
        return ClassificationResult(
            "illegal_cutting",
            f"Sudden bioelectric spike ({mv} mV) exceeds cutting threshold",
        )

    if temp > FIRE_RISK_TEMP_ABOVE and humidity < FIRE_RISK_HUMIDITY_BELOW:
        return ClassificationResult(
            "fire_risk",
            f"Temp {temp}C above {FIRE_RISK_TEMP_ABOVE}C and humidity {humidity}% "
            f"below {FIRE_RISK_HUMIDITY_BELOW}%",
        )

    if mv < HEAT_STRESS_MV_DROP_BELOW and temp > HEAT_STRESS_TEMP_ABOVE:
        return ClassificationResult(
            "heat_stress",
            f"Bioelectric signal ({mv} mV) dropped below {HEAT_STRESS_MV_DROP_BELOW} "
            f"while temp ({temp}C) above {HEAT_STRESS_TEMP_ABOVE}C",
        )

    return ClassificationResult("normal", "All readings within baseline range")