"""
Confirms sensor_data is actually a hypertable (not just a regular table).
Run: python -m app.db.verify_hypertable
"""
from sqlalchemy import text
from app.db.session import engine


def verify():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT hypertable_name, num_chunks
            FROM timescaledb_information.hypertables
            WHERE hypertable_name = 'sensor_data';
        """))
        row = result.fetchone()
        if row:
            print(f"CONFIRMED: '{row[0]}' is a hypertable with {row[1]} chunk(s).")
        else:
            print("NOT a hypertable — something went wrong, check for errors above.")


if __name__ == "__main__":
    verify()