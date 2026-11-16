@echo off
setlocal
cd /d "%~dp0"
title Packaging Web Development Internship Project

echo ========================================================
echo   Packaging Project for Transfer to Other Windows PCs
echo ========================================================
echo.
echo [*] Compressing project into 'Vanshika_WebDev_Project.zip'...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Compress-Archive -Path 'index.html', 'README.md', 'test.js', 'install.bat', 'start.bat', 'task1-calculator', 'task2-ecommerce', 'task3-todolist', 'task4-connect4' -DestinationPath '..\Vanshika_WebDev_Project.zip' -Force"

if %ERRORLEVEL% equ 0 (
    echo.
    echo [OK] Successfully created 'Vanshika_WebDev_Project.zip' in parent folder!
    echo      You can now copy this zip file to any USB drive or Windows machine.
) else (
    echo [ERROR] Failed to create zip package.
)
echo.
pause
