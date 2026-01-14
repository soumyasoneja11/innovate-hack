#!/bin/bash

# Stop all TrashIT services

echo "Stopping all TrashIT services..."

# Read PIDs from files if they exist
if [ -d "logs" ]; then
    if [ -f "logs/ai-engine.pid" ]; then
        AI_PID=$(cat logs/ai-engine.pid)
        kill $AI_PID 2>/dev/null && echo "✅ Stopped AI Engine (PID: $AI_PID)"
        rm logs/ai-engine.pid
    fi
    
    if [ -f "logs/backend.pid" ]; then
        BACKEND_PID=$(cat logs/backend.pid)
        kill $BACKEND_PID 2>/dev/null && echo "✅ Stopped Backend (PID: $BACKEND_PID)"
        rm logs/backend.pid
    fi
    
    if [ -f "logs/frontend.pid" ]; then
        FRONTEND_PID=$(cat logs/frontend.pid)
        kill $FRONTEND_PID 2>/dev/null && echo "✅ Stopped Frontend (PID: $FRONTEND_PID)"
        rm logs/frontend.pid
    fi
fi

# Also try to kill by port in case PIDs are not saved
lsof -ti:8000 | xargs kill -9 2>/dev/null && echo "✅ Killed process on port 8000"
lsof -ti:5001 | xargs kill -9 2>/dev/null && echo "✅ Killed process on port 5001"
lsof -ti:5173 | xargs kill -9 2>/dev/null && echo "✅ Killed process on port 5173"

echo ""
echo "All services stopped."
