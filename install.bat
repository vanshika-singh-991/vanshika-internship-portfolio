@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
title "Web Development Internship - Setup and Installer"

echo ========================================================
echo   Web Development Internship - One-Click Installer
echo   Student: Vanshika Singh (TCA2468642)
echo ========================================================
echo.

:: 1. Integrity check
echo [*] Checking project integrity...
set "MISSING=0"
if not exist "index.html" set "MISSING=1"
if not exist "task1-calculator\index.html" set "MISSING=1"
if not exist "task2-ecommerce\index.html" set "MISSING=1"
if not exist "task3-todolist\index.html" set "MISSING=1"
if not exist "task4-connect4\index.html" set "MISSING=1"

if "%MISSING%"=="1" (
    echo [ERROR] Some project files are missing. Please ensure all folders are intact.
    pause
    exit /b 1
)
echo [OK] All 4 task modules verified successfully.
echo.

:: 2. Create Desktop Shortcut via native Windows PowerShell
echo [*] Creating Desktop shortcut...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ws = New-Object -ComObject WScript.Shell; " ^
  "$desktop = [Environment]::GetFolderPath('Desktop'); " ^
  "$shortcut = $ws.CreateShortcut(\"$desktop\Web Development Internship.lnk\"); " ^
  "$shortcut.TargetPath = '%~dp0start.bat'; " ^
  "$shortcut.WorkingDirectory = '%~dp0'; " ^
  "$shortcut.Description = 'Web Development Internship - Vanshika Singh'; " ^
  "$shortcut.IconLocation = 'shell32.dll,14'; " ^
  "$shortcut.Save();"

if %ERRORLEVEL% equ 0 (
    echo [OK] Desktop shortcut created: 'Web Development Internship.lnk'
) else (
    echo [WARNING] Could not create desktop shortcut automatically. You can run start.bat directly.
)

echo.
echo ========================================================
echo   Installation Complete!
echo   You can now launch the project anytime using either:
echo     1. The desktop shortcut: 'Web Development Internship'
echo     2. Double-clicking 'start.bat' inside this folder
echo ========================================================
echo.
set /p LAUNCH_NOW="Would you like to launch the project now? (Y/N): "
if /i "%LAUNCH_NOW%"=="Y" (
    call "%~dp0start.bat"
)
