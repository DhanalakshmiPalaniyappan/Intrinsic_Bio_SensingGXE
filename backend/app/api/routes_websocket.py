"""
WebSocket endpoint — pushes new sensor readings + classifications to
connected frontend clients in real time.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter()

active_connections: List[WebSocket] = []


@router.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)


async def broadcast_reading(data: dict):
    dead = []
    for connection in active_connections:
        try:
            await connection.send_json(data)
        except Exception:
            dead.append(connection)
    for d in dead:
        active_connections.remove(d)