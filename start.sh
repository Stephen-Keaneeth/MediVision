#!/bin/bash
# Start script for HackOS evaluation

echo "Starting MediVision AI..."

# Check if Docker Compose is available
if command -v docker-compose &> /dev/null; then
    echo "Using docker-compose..."
    docker-compose up --build -d
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    echo "Using docker compose plugin..."
    docker compose up --build -d
else
    echo "Docker not found. Falling back to manual startup..."
    
    # Start Backend
    echo "Starting backend..."
    pip install -r requirements.txt
    gunicorn backend.main:app -k uvicorn.workers.UvicornWorker --workers 1 --bind 0.0.0.0:8000 &
    BACKEND_PID=$!

    # Start Frontend
    echo "Starting frontend..."
    cd frontend
    npm install
    npm run dev &
    FRONTEND_PID=$!

    echo "MediVision AI is running!"
    echo "Backend: http://localhost:8000"
    echo "Frontend: http://localhost:5173"

    # Wait for both processes
    wait $BACKEND_PID $FRONTEND_PID
fi
