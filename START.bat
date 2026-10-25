@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Can cai Node.js 22 tro len. Xem README.md.
  pause
  exit /b 1
)
echo Mo trinh duyet tai http://localhost:3000
echo Giu cua so nay de ung dung tiep tuc chay. Ctrl+C de dung.
node server.mjs
pause
