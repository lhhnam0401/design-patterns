#!/bin/bash
# Start both client and server
echo "🚀 Starting Design Patterns app..."

# Server
cd server
pip install -r requirements.txt -q
python run.py &
SERVER_PID=$!
cd ..

# Client
cd client
npm run dev &
CLIENT_PID=$!
cd ..

echo "✅ Server: http://localhost:8000"
echo "✅ Client: http://localhost:5173"
echo "Press Ctrl+C to stop both"

trap "kill $SERVER_PID $CLIENT_PID" EXIT
wait
