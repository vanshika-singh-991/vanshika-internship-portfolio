@echo off
setlocal
cd /d "%~dp0"
title Web Development Internship - Launcher

echo ========================================================
echo   Web Development Internship - Project Launcher
echo   Student: Vanshika Singh (TCA2468642)
echo   CCSIT, Teerthanker Mahaveer University
echo ========================================================
echo.

:: 1. Try Python local server
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [INFO] Python detected. Starting local HTTP server on port 3000...
    start "" http://localhost:3000
    python -m http.server 3000
    goto :end
)

:: 2. Try Node.js npx serve
where npx >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [INFO] Node.js detected. Starting local HTTP server on port 3000...
    npx --yes serve -p 3000 .
    goto :end
)

:: 3. Universal Fallback: Native direct launch in default web browser (Edge/Chrome/Firefox)
echo [INFO] Launching directly in your default web browser...
start "" "%~dp0index.html"

:end
