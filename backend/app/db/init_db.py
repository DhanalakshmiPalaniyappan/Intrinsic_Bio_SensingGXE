from app.db.base import Base
from app.db.session import engine

from app.models import plant, device, experiment, sensor_data, prediction  # noqa: F401


def init_db():
    Base.metadata.create_all(bind=engine)
    print("All tables created successfully.")


if __name__ == "__main__":
    init_db()