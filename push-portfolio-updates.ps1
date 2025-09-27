# Portfolio Updates Push Script
# This script pushes the recent portfolio improvements to GitHub main branch

Write-Host "Starting Portfolio Push to GitHub..." -ForegroundColor Green

# Navigate to project directory
$projectPath = "c:\Users\supree\Downloads\SupreethRagavendra.com-main\SupreethRagavendra.com-main"
Set-Location $projectPath

Write-Host "Current directory: $projectPath" -ForegroundColor Yellow

# Check Git status
Write-Host "Checking Git status..." -ForegroundColor Blue
git status

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Blue
git add .

# Create commit message
$commitMessage = "Portfolio UI/UX Enhancements: Fixed navigation, redesigned About/Contact/Education sections, updated Services layout, improved responsive design and animations"

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Blue
git commit -m "$commitMessage"

# Check if commit was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit successful!" -ForegroundColor Green
    
    # Push to main branch
    Write-Host "Pushing to GitHub main branch..." -ForegroundColor Blue
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "SUCCESS! Portfolio updates pushed to GitHub main branch!" -ForegroundColor Green
        Write-Host "Your portfolio is now live with all improvements!" -ForegroundColor Yellow
        
        # Show final status
        Write-Host "Final Git status:" -ForegroundColor Blue
        git status
    }
    else {
        Write-Host "Push failed! Please check your GitHub connection." -ForegroundColor Red
    }
}
else {
    Write-Host "Commit failed! Please check for any issues." -ForegroundColor Red
}

Write-Host "Script completed!" -ForegroundColor Green