# PowerShell script to push portfolio updates to GitHub main branch
# Following user preference for Git workflow and clean working tree

Write-Host "🚀 Starting GitHub push process..." -ForegroundColor Green

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not in a Git repository!" -ForegroundColor Red
    Write-Host "💡 Initialize Git repository first with: git init" -ForegroundColor Yellow
    exit 1
}

# Check Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Cyan
git status

# Add all changes
Write-Host "➕ Adding all changes..." -ForegroundColor Cyan
git add .

# Check if there are changes to commit
$changes = git diff --staged --name-only
if (-not $changes) {
    Write-Host "✅ No changes to commit. Working tree is clean." -ForegroundColor Green
    exit 0
}

Write-Host "📝 Changes to be committed:" -ForegroundColor Yellow
$changes | ForEach-Object { Write-Host "   - $_" -ForegroundColor White }

# Create commit message
$commitMessage = "Update portfolio: Resume link, contact form, and project images

- Updated resume download links to new Google Drive URL
- Configured contact form with Formspree endpoint (xanpndqw)
- Enhanced form handling with custom success/error messages
- Updated project images to use proper local assets
- Improved user experience with AJAX form submission
- Updated email routing to supreethvennila@gmail.com"

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Failed to commit changes!" -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "🌿 Current branch: $currentBranch" -ForegroundColor Cyan

# Switch to main branch if not already there
if ($currentBranch -ne "main") {
    Write-Host "🔄 Switching to main branch..." -ForegroundColor Cyan
    git checkout main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Warning: Could not switch to main branch. Continuing with current branch." -ForegroundColor Yellow
    }
}

# Push to GitHub main branch
Write-Host "⬆️  Pushing to GitHub main branch..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub main branch!" -ForegroundColor Green
    Write-Host "🎉 Portfolio updates are now live on GitHub!" -ForegroundColor Green
    
    # Show final status
    Write-Host "`n📊 Final Git status:" -ForegroundColor Cyan
    git status
    
    Write-Host "`n🔗 Recent commits:" -ForegroundColor Cyan
    git log --oneline -3
    
} else {
    Write-Host "❌ Error: Failed to push to GitHub!" -ForegroundColor Red
    Write-Host "💡 Possible solutions:" -ForegroundColor Yellow
    Write-Host "   - Check your internet connection" -ForegroundColor White
    Write-Host "   - Verify GitHub authentication (token/SSH key)" -ForegroundColor White
    Write-Host "   - Ensure remote 'origin' is configured correctly" -ForegroundColor White
    Write-Host "   - Try: git remote -v" -ForegroundColor White
    exit 1
}

Write-Host "`n🏁 Git workflow completed successfully!" -ForegroundColor Green