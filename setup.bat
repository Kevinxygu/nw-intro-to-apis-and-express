@echo off
echo 🚀 Setting up nwPlus API Workshop...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

REM Setup backend
echo 📦 Setting up backend...
cd backend
call npm install
if not exist .env (
    copy .env.example .env
    echo ⚠️  Created .env file. Please add your Gemini API key!
)
cd ..

REM Setup frontend
echo 📦 Setting up frontend...
cd frontend
call npm install
cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Starting development servers...
echo    Backend: http://localhost:3001
echo    Frontend: http://localhost:3000
echo.
echo ⚠️  Make sure to add your Gemini API key to backend\.env
echo    Get your key at: https://aistudio.google.com/api-keys
echo.
echo 🎉 Happy coding!
echo.

REM Start backend in new window
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Servers started in separate windows!
echo    Press any key to exit this window...
pause >nul