@echo off
if "%1"=="" (
    echo Usage: fetch.bat ^<URL^>
    echo Example: fetch.bat https://example.com
    exit /b 1
)
npm run fetch %1
