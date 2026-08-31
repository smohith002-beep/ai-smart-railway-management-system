# ============================================================================
# AI SMART RAILWAY MANAGEMENT SYSTEM - ONE-CLICK USB ANDROID DEPLOYMENT (PS1)
# ============================================================================

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$PSScriptRoot\.."

Write-Host "Starting Smart Railway Live Android USB Deployment..." -ForegroundColor Cyan
node scripts\run-android-usb.cjs
