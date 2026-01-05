#!/bin/bash

# Start both frontend and backend servers

echo "🚀 Starting Orvox AI Development Servers..."
echo ""

# Start backend in background
echo "📦 Starting backend server..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "⚡ Starting frontend server..."
npm run dev

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT TERM


