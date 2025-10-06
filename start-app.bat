@echo off
echo ========================================
echo    SAWIT HARVEST SaaS - STARTUP SCRIPT
echo ========================================
echo.

echo [1/4] Cleaning up previous builds...
if exist .next rmdir /s /q .next
echo ✓ Cleaned .next folder

echo.
echo [2/4] Installing dependencies...
call npm install
echo ✓ Dependencies installed

echo.
echo [3/4] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✓ Build successful

echo.
echo [4/4] Starting development server...
echo.
echo ========================================
echo   🚀 APPLICATION IS READY!
echo ========================================
echo.
echo 📱 Open your browser and go to:
echo    http://localhost:3000
echo    http://localhost:3001
echo    http://localhost:3002
echo    http://localhost:3003
echo.
echo 🎨 Animation Demo:
echo    http://localhost:3003/animations
echo.
echo 🔐 Authentication:
echo    http://localhost:3003/auth/register
echo    http://localhost:3003/auth/login
echo.
echo 📊 Dashboard:
echo    http://localhost:3003/dashboard
echo.
echo 👑 Admin Dashboard:
echo    http://localhost:3003/admin/dashboard
echo.
echo ========================================
echo.
call npm run dev
