@echo off
echo Starting MediVision AI...

echo Starting Backend...
start cmd /k "pip install -r requirements.txt && uvicorn backend.main:app --host 0.0.0.0 --port 8001"

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo MediVision AI is running!
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173
echo Close the newly opened command windows to stop the servers.
pause
