"""
Export labeled sensor dataset as CSV — reads REAL data from the database
(sensor_data + predictions tables), not mock data.

Run from backend/, with venv active: python -m app.export_dataset
Output: dataset_export.csv (in backend/)
"""
import csv
from typing import Optional

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.sensor_data import SensorData
from app.models.prediction import Prediction


def export_csv(output_path: str = "dataset_export.csv", device_id: Optional[str] = None):
    db: Session = SessionLocal()
    try:
        query = db.query(SensorData, Prediction).join(
            Prediction,
            (SensorData.device_id == Prediction.device_id)
            & (SensorData.timestamp == Prediction.timestamp),
        )
        if device_id:
            query = query.filter(SensorData.device_id == device_id)

        rows = query.order_by(SensorData.timestamp).all()

        if not rows:
            print("No data found. Make sure readings have been ingested and classified first.")
            return

        with open(output_path, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([
                "Date", "Device_ID", "Bioelectric_mV", "Soil_Moisture",
                "Temperature_C", "Humidity", "Anomaly_Type", "Anomaly_Label",
            ])

            for sensor, pred in rows:
                anomaly_type = pred.condition.replace("_", " ").title().replace(" ", "_")
                writer.writerow([
                    sensor.timestamp.date().isoformat(),
                    sensor.device_id,
                    sensor.bioelectric_mv,
                    sensor.soil_moisture,
                    sensor.temperature_c,
                    sensor.humidity,
                    anomaly_type,
                    pred.is_alert,
                ])

        print(f"Wrote {len(rows)} rows to {output_path}")
    finally:
        db.close()


if __name__ == "__main__":
    export_csv()