@echo off
REM ============================================================================
REM AI SMART RAILWAY MANAGEMENT SYSTEM - ONE-CLICK USB ANDROID DEPLOYMENT
REM ============================================================================

setlocal
cd /d "%~dp0\.."

echo Starting Smart Railway Live Android USB Deployment...
node scripts\run-android-usb.cjs

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Deployment encountered an issue.
    pause
)
