# PowerShell script to open portfolio in browser
Write-Host "🚀 Opening portfolio website..." -ForegroundColor Green

# Get the current directory path
$currentPath = Get-Location
$indexPath = Join-Path $currentPath "index.html"

# Check if index.html exists
if (Test-Path $indexPath) {
    # Open in default browser
    Start-Process $indexPath
    Write-Host "✅ Portfolio opened in browser!" -ForegroundColor Green
    Write-Host "📍 File location: $indexPath" -ForegroundColor Yellow
    
    # Also open test file
    $testPath = Join-Path $currentPath "test-aws-icon.html"
    if (Test-Path $testPath) {
        Write-Host "🔍 Opening AWS icon test page..." -ForegroundColor Cyan
        Start-Process $testPath
    }
}
else {
    Write-Host "❌ index.html not found in current directory" -ForegroundColor Red
    Write-Host "📁 Current directory: $currentPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 What to check:"
Write-Host "1. Navigate to the Skills section"
Write-Host "2. Look for the AWS icon and logo"
Write-Host "3. Check if all skill cards are displaying properly"