# PowerShell script to download all skill images
Write-Host "🚀 Starting image download for portfolio skills..." -ForegroundColor Green

# Create images folder if it doesn't exist
$imagesFolder = "images\skills"
if (!(Test-Path $imagesFolder)) {
    New-Item -ItemType Directory -Path $imagesFolder -Force | Out-Null
}

# Function to download image
function Download-Image {
    param(
        [string]$Url,
        [string]$Filename,
        [string]$Folder
    )
    
    try {
        Write-Host "Downloading $Filename..." -ForegroundColor Yellow
        
        $filepath = Join-Path $Folder $Filename
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        $webClient.DownloadFile($Url, $filepath)
        $webClient.Dispose()
        
        Write-Host "✅ Successfully downloaded: $Filename" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Failed to download $Filename`: $_" -ForegroundColor Red
        return $false
    }
}

# Define all images with their URLs and desired filenames
$imagesToDownload = @(
    # Existing images (from Cloudinary)
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1724221811/c573ff5552d6da9a1d28ec4e27cd1445-removebg-preview_w2hkck.png"; Filename = "html.png" },
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1724222003/ac262626eb1e924c85b8b68fe97c2213-removebg-preview_kihgsi.png"; Filename = "css.png" },
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472150/Bootstrap-removebg-preview_opsbke.png"; Filename = "bootstrap.png" },
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1712139571/10_Best_Cheat_Sheets_That_A_Programmer_Must_Have-removebg-preview_daf4wt.png"; Filename = "javascript.png" },
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472150/SQL_Basics___Hands-On_Beginner_SQL_Tutorial_Analyzing_Bike-Sharing-removebg-preview_a0aug6.png"; Filename = "sql.png" },
    @{ Url = "https://res.cloudinary.com/do40wkay9/image/upload/v1733040925/tailwindcss_tynm1s.svg"; Filename = "tailwind.svg" },
    @{ Url = "https://res.cloudinary.com/do40wkay9/image/upload/v1735139876/java-icon-1511x2048-6ikx8301_jmm7hc.png"; Filename = "java.png" },
    @{ Url = "https://res.cloudinary.com/do40wkay9/image/upload/v1733040536/firebsae-removebg-preview_rq7im1.png"; Filename = "firebase.png" },
    @{ Url = "https://res.cloudinary.com/dffu1ungl/image/upload/v1709472151/download__2_-removebg-preview_sjc7gv.png"; Filename = "python.png" },
    @{ Url = "https://res.cloudinary.com/do40wkay9/image/upload/v1735140104/Spring_Boot_oka8ll.svg"; Filename = "spring-boot.svg" },
    
    # New skill images (from CDN)
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"; Filename = "php.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"; Filename = "android-studio.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"; Filename = "mysql.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"; Filename = "git.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"; Filename = "figma.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"; Filename = "docker.svg" },
    @{ Url = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"; Filename = "responsive-design.svg" },
    @{ Url = "https://img.icons8.com/color/48/000000/scrum.png"; Filename = "agile.png" }
)

# Download all images
$downloadedCount = 0
$failedCount = 0

foreach ($image in $imagesToDownload) {
    $result = Download-Image -Url $image.Url -Filename $image.Filename -Folder $imagesFolder
    
    if ($result) {
        $downloadedCount++
    } else {
        $failedCount++
    }
    
    # Small delay to be respectful to servers
    Start-Sleep -Milliseconds 500
}

# Summary
Write-Host ""
Write-Host "📊 Download Summary:" -ForegroundColor Cyan
Write-Host "✅ Successfully downloaded: $downloadedCount images" -ForegroundColor Green
Write-Host "❌ Failed downloads: $failedCount images" -ForegroundColor Red
Write-Host "📁 Images saved to: $imagesFolder\" -ForegroundColor Yellow

if ($downloadedCount -gt 0) {
    Write-Host ""
    Write-Host "🎉 Images are ready! You can now update your HTML to use local paths like:" -ForegroundColor Green
    Write-Host "   <img src=`"$imagesFolder/html.png`" ... />" -ForegroundColor White
}