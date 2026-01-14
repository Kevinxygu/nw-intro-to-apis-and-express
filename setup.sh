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
echo "📝 Next steps:"
echo "   1. Add your Gemini API key to backend/.env"
echo "   2. Run 'npm run dev' in the backend directory"
echo "   3. Run 'npm run dev' in the frontend directory (new terminal)"
echo "   4. Open http://localhost:3000 in your browser"
echo ""
echo "🎉 Happy coding!"