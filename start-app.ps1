# Sawit Harvest SaaS - Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SAWIT HARVEST SaaS - STARTUP SCRIPT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/4] Cleaning up previous builds..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ Cleaned .next folder" -ForegroundColor Green
} else {
    Write-Host "✓ No .next folder to clean" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/4] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "[3/4] Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Build successful" -ForegroundColor Green

Write-Host ""
Write-Host "[4/4] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   🚀 APPLICATION IS READY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Open your browser and go to:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Blue
Write-Host "   http://localhost:3001" -ForegroundColor Blue
Write-Host "   http://localhost:3002" -ForegroundColor Blue
Write-Host "   http://localhost:3003" -ForegroundColor Blue
Write-Host ""
Write-Host "🎨 Animation Demo:" -ForegroundColor White
Write-Host "   http://localhost:3003/animations" -ForegroundColor Magenta
Write-Host ""
Write-Host "🔐 Authentication:" -ForegroundColor White
Write-Host "   http://localhost:3003/auth/register" -ForegroundColor Yellow
Write-Host "   http://localhost:3003/auth/login" -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 Dashboard:" -ForegroundColor White
Write-Host "   http://localhost:3003/dashboard" -ForegroundColor Green
Write-Host ""
Write-Host "👑 Admin Dashboard:" -ForegroundColor White
Write-Host "   http://localhost:3003/admin/dashboard" -ForegroundColor Red
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the development server
npm run dev
