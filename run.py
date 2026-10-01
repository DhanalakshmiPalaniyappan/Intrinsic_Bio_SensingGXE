"""
Intrinsic Bio-Sensing Web App Launcher
Runs both the FastAPI backend and Vite frontend concurrently with a single command.

Usage:
    python run.py
"""

import sys
import os
import re
import subprocess
import threading
import time
import webbrowser
from pathlib import Path

# Ensure UTF-8 output on Windows standard console
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

ROOT_DIR = Path(__file__).parent.resolve()
BACKEND_DIR = ROOT_DIR / "backend"
FRONTEND_DIR = ROOT_DIR / "frontend"

frontend_url = None
url_opened = False


def get_python_executable():
    """Finds backend venv python or falls back to current system python."""
    if sys.platform == "win32":
        venv_python = BACKEND_DIR / "venv" / "Scripts" / "python.exe"
    else:
        venv_python = BACKEND_DIR / "venv" / "bin" / "python"

    if venv_python.exists():
        return str(venv_python)
    return sys.executable


def stream_output(process, prefix, is_frontend=False):
    """Reads stdout from a subprocess line by line, prints logs, and detects frontend URL."""
    global frontend_url, url_opened
    try:
        for line in iter(process.stdout.readline, ""):
            if not line:
                break
            stripped = line.strip()
            print(f"{prefix} {stripped}", flush=True)

            # Detect Vite dev server URL automatically
            if is_frontend and not url_opened:
                match = re.search(r"http://(localhost|127\.0\.0\.1):\d+/?", stripped)
                if match:
                    frontend_url = match.group(0)
                    url_opened = True
                    print(
                        f"\n[INFO] Frontend active at {frontend_url}! Opening in browser...\n",
                        flush=True,
                    )
                    try:
                        webbrowser.open(frontend_url)
                    except Exception:
                        pass
    except Exception:
        pass


def fallback_open_browser():
    """Fallback in case regex didn't trigger within 5 seconds."""
    global url_opened
    time.sleep(5)
    if not url_opened:
        target = frontend_url or "http://localhost:5173"
        url_opened = True
        print(f"\n[INFO] Opening {target} in your default browser...\n", flush=True)
        try:
            webbrowser.open(target)
        except Exception:
            pass


def main():
    print("=" * 65)
    print(" Intrinsic Bio-Sensing of Trees Web Application Launcher")
    print("=" * 65)

    if not BACKEND_DIR.exists() or not FRONTEND_DIR.exists():
        print("[ERROR] Must be run from the root directory of Intrinsic_bio_sensing.")
        sys.exit(1)

    python_bin = get_python_executable()
    print(f"[*] Python Executable : {python_bin}")
    print("[*] Backend Server    : FastAPI (http://localhost:8000)")
    print("[*] Frontend Server   : Vite Dev Server (http://localhost:5173)")
    print("-" * 65)

    backend_cmd = [
        python_bin,
        "-m",
        "uvicorn",
        "app.main:app",
        "--host",
        "127.0.0.1",
        "--port",
        "8000",
        "--reload",
    ]

    npm_cmd = "npm.cmd" if sys.platform == "win32" else "npm"
    frontend_cmd = [npm_cmd, "run", "dev"]

    processes = []

    try:
        # Launch Backend Process
        backend_proc = subprocess.Popen(
            backend_cmd,
            cwd=BACKEND_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            bufsize=1,
            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if sys.platform == "win32" else 0,
        )
        processes.append(backend_proc)

        # Launch Frontend Process
        frontend_proc = subprocess.Popen(
            frontend_cmd,
            cwd=FRONTEND_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            bufsize=1,
            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if sys.platform == "win32" else 0,
        )
        processes.append(frontend_proc)

        # Output streaming threads
        t_back = threading.Thread(
            target=stream_output, args=(backend_proc, "[BACKEND] ", False), daemon=True
        )
        t_front = threading.Thread(
            target=stream_output, args=(frontend_proc, "[FRONTEND]", True), daemon=True
        )
        t_back.start()
        t_front.start()

        # Fallback browser trigger thread
        t_fallback = threading.Thread(target=fallback_open_browser, daemon=True)
        t_fallback.start()

        print("Press Ctrl+C to stop both backend and frontend servers.\n", flush=True)

        while True:
            time.sleep(0.5)
            for p in processes:
                if p.poll() is not None:
                    print(f"[WARN] A sub-process exited with code {p.returncode}")
                    raise KeyboardInterrupt

    except KeyboardInterrupt:
        print("\n[STOP] Shutting down servers...", flush=True)
        for p in processes:
            try:
                p.terminate()
            except Exception:
                pass

        time.sleep(1)
        for p in processes:
            if p.poll() is None:
                try:
                    p.kill()
                except Exception:
                    pass
        print("[DONE] Shutdown complete.", flush=True)


if __name__ == "__main__":
    main()
