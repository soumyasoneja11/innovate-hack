#!/bin/bash

# TrashIT Platform - Quick Start Script
# This script starts all three services needed for the platform

echo "🚮 TrashIT Platform - Starting all services..."
echo ""

# Check if GEMINI_API_KEY is set
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY not set!"
    echo "Please set it first:"
    echo "  export GEMINI_API_KEY='your-api-key-here'"
    echo ""
    echo "Get your API key from: https://makersuite.google.com/app/apikey"
    exit 1
fi

echo "✅ GEMINI_API_KEY is set"
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        echo "   Kill the process with: lsof -ti:$1 | xargs kill -9"
        return 1
    fi
    return 0
}

# Check ports
echo "Checking ports..."
check_port 8000 || exit 1
check_port 5001 || exit 1
check_port 5173 || exit 1
echo "✅ All ports are available"
echo ""

# Start services in background
echo "Starting services..."
echo ""

# 1. Start AI Engine
echo "🤖 Starting AI Engine (port 8000)..."
cd trashit-ai
uvicorn app:app --reload --port 8000 > ../logs/ai-engine.log 2>&1 &
AI_PID=$!
echo "   PID: $AI_PID"
cd ..

# Wait a bit for AI engine to start
sleep 3

# 2. Start Backend
echo "⚙️  Starting Backend API (port 5001)..."
cd server
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "   PID: $BACKEND_PID"
cd ..

# Wait a bit for backend to start
sleep 3

# 3. Start Frontend
echo "🎨 Starting Frontend (port 5173)..."
cd client
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   PID: $FRONTEND_PID"
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All services started successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Service URLs:"
echo "  🎨 Frontend:  http://localhost:5173"
echo "  ⚙️  Backend:   http://localhost:5001"
echo "  🤖 AI Engine: http://localhost:8000/docs"
echo ""
echo "Process IDs:"
echo "  AI Engine: $AI_PID"
echo "  Backend:   $BACKEND_PID"
echo "  Frontend:  $FRONTEND_PID"
echo ""
echo "To stop all services, press Ctrl+C or run:"
echo "  kill $AI_PID $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Logs are available in the 'logs' directory"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Save PIDs to file for later cleanup
mkdir -p logs
echo "$AI_PID" > logs/ai-engine.pid
echo "$BACKEND_PID" > logs/backend.pid
echo "$FRONTEND_PID" > logs/frontend.pid

# Wait for Ctrl+C
echo ""
echo "Press Ctrl+C to stop all services..."
trap "echo ''; echo 'Stopping all services...'; kill $AI_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'All services stopped.'; exit 0" INT

# Keep script running
wait
