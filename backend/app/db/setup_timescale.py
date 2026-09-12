"""
Converts sensor_data into a TimescaleDB hypertable — run ONCE, after init_db.py
has already created the plain table.

Run: python -m app.db.setup_timescale  (from backend/, with venv active)
"""
from sqlalchemy import text
from app.db.session import engine


def setup_timescale():
    with engine.connect() as conn:
        # Enable the TimescaleDB extension (safe to run even if already enabled)
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS timescaledb;"))
        conn.commit()

        # Convert sensor_data into a hypertable, partitioned by timestamp
        # if_not_exists avoids an error if you run this twice
        conn.execute(text("""
            SELECT create_hypertable(
                'sensor_data',
                'timestamp',
                if_not_exists => TRUE
            );
        """))
        conn.commit()

        print("sensor_data is now a TimescaleDB hypertable.")


if __name__ == "__main__":
    setup_timescale()