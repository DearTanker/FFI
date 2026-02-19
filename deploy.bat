@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================
echo  OrcaSlicer Integration Deployment
echo ======================================
echo.

REM Change to project root
cd /d "C:\Users\DearTanker\OneDrive\文档\GitHub\FFI"

REM Step 1: Kill blocking processes
echo [1/7] Terminating blocking processes...
taskkill /IM git.exe /F >nul 2>&1
taskkill /IM Code.exe /F >nul 2>&1
taskkill /IM node.exe /F >nul 2>&1
timeout /t 2 /nobreak >nul

REM Step 2: Clean git objects
echo [2/7] Cleaning git objects...
for %%i in (03 04 05 06 07 08 09 0a 0b 0c) do (
    rmdir /s /q ".git\objects\%%i" >nul 2>&1
)

REM Step 3: Git operations
echo [3/7] Configuring git...
git config --local core.longpaths true >nul 2>&1
git config --local core.safecrlf false >nul 2>&1

REM Step 4: Add files
echo [4/7] Adding new files...
git add "Workers/src/lib/filamentFieldMap.ts" >nul 2>&1
git add "Workers/src/components/OrcaFilamentDetails.tsx" >nul 2>&1
git add "Workers/src/app/filaments/[[...slug]]/FilamentsClient.tsx" >nul 2>&1
git add "*.md" >nul 2>&1

REM Step 5: Commit
echo [5/7] Committing changes...
git commit -m "feat: Integrate OrcaSlicer UI icons and data structure" >nul 2>&1

REM Step 6: Push
echo [6/7] Pushing to GitHub...
git push origin main >nul 2>&1

REM Step 7: Build and Deploy
echo [7/7] Building and deploying...
cd /d "C:\Users\DearTanker\OneDrive\文档\GitHub\FFI\Workers"

echo.
echo Building project...
call npm run build

echo.
echo Deploying to Cloudflare...
call npm run deploy

echo.
echo ======================================
echo  Deployment Complete!
echo ======================================
echo.
echo Check:
echo   - GitHub: https://github.com/yourusername/FFI
echo   - Cloudflare: Dashboard
echo.
pause
