"""
Minimal JWT auth — single hardcoded demo user for now.
Good enough to satisfy the QA checklist's "unauthorized access rejected"
requirement without building a full user management system under time
pressure. Upgrade to a real users table later if time allows.
"""
import os
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = os.getenv("JWT_SECRET", "change-this-in-production")
ALGORITHM = "HS256"
DEMO_USERNAME = "admin"
DEMO_PASSWORD = "dhana@1234"  # change before any real deployment  # change before any real deployment

security = HTTPBearer()


def create_access_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=8)
    return jwt.encode({"sub": username, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")