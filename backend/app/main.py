from fastapi import FastAPI
from app.config import DATABASE_URL

app = FastAPI(title="Intrinsic Bio-Sensing of Trees API")

@app.get("/health")
def health_check():
    return {"status": "ok"}