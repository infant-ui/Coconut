$GIT = "$env:LOCALAPPDATA\GitHubDesktop\app-3.6.7\resources\app\git\cmd\git.exe"
$GIT_LFS = "$env:LOCALAPPDATA\GitHubDesktop\app-3.6.7\resources\app\git\mingw64\libexec\git-core\git-lfs.exe"
$REMOTE = "https://github.com/infant-ui/Coconut.git"

Set-Location "c:\Users\infant\OneDrive\Documents\Bday Site"

Write-Host "=== Step 1: Init git repo ===" -ForegroundColor Cyan
& $GIT init
& $GIT config user.email "infant-ui@github.com"
& $GIT config user.name "infant-ui"

Write-Host ""
Write-Host "=== Step 2: Install Git LFS ===" -ForegroundColor Cyan
& $GIT_LFS install

Write-Host ""
Write-Host "=== Step 3: Track large files with LFS ===" -ForegroundColor Cyan
& $GIT_LFS track "*.mp4"
& $GIT_LFS track "*.MP4"

Write-Host ""
Write-Host "=== Step 4: Stage all files ===" -ForegroundColor Cyan
& $GIT add .gitattributes
& $GIT add .

Write-Host ""
Write-Host "=== Step 5: Check status ===" -ForegroundColor Cyan
& $GIT status --short | Select-Object -First 30

Write-Host ""
Write-Host "=== Step 6: Commit ===" -ForegroundColor Cyan
& $GIT commit -m "Initial commit: Sunflower Birthday Website for Coconut"

Write-Host ""
Write-Host "=== Step 7: Set remote & push ===" -ForegroundColor Cyan
& $GIT remote add origin $REMOTE 2>$null
& $GIT branch -M main
& $GIT push -u origin main

Write-Host ""
Write-Host "=== DONE! Check https://github.com/infant-ui/Coconut ===" -ForegroundColor Green
