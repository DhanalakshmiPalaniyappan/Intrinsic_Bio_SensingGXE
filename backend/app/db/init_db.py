"""
Run this once to create all tables from the models above.
Run: python -m app.db.init_db  (from backend/, with venv active)
"""
from app.db.base import Base
from app.db.session import engine

# Import models so Base knows about them (required even though "unused")
from app.models import plant, device, experiment, sensor_data  # noqa: F401


def init_db():
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully.")


if __name__ == "__main__":
    init_db()