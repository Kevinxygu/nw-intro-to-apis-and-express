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
echo 📝 Next steps:
echo    1. Add your Gemini API key to backend\.env
echo    2. Run 'npm run dev' in the backend directory
echo    3. Run 'npm run dev' in the frontend directory (new terminal)
echo    4. Open http://localhost:3000 in your browser
echo.
echo 🎉 Happy coding!
pause