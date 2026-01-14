#!/bin/bash

echo "🚀 Setting up nwPlus API Workshop..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup backend
echo "📦 Setting up backend..."
cd backend
npm install
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env file. Please add your Gemini API key!"
fi
cd ..

# Setup frontend
echo "📦 Setting up frontend..."
cd frontend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Starting development servers..."
echo "   Backend: http://localhost:3001"
echo "   Frontend: http://localhost:3000"
echo ""
echo "⚠️  Make sure to add your Gemini API key to backend/.env"
echo "   Get your key at: https://aistudio.google.com/api-keys"
echo ""
echo "🎉 Happy coding!"
echo ""

# Start backend in background
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Start frontend
cd frontend
npm run dev