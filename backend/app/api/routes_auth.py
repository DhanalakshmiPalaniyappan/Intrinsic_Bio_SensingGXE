from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.security import create_access_token, DEMO_USERNAME, DEMO_PASSWORD

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(payload: LoginRequest):
    if payload.username != DEMO_USERNAME or payload.password != DEMO_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(payload.username)
    return {"access_token": token, "token_type": "bearer"}