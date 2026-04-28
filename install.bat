@echo off
REM Script de instalación automática para Chispa (Windows)
REM Ejecuta: double-click o "cmd /c install.bat"

echo.
echo ================================
echo    CHISPA - Instalador Automático
echo ================================
echo.

REM Verificar si Node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado!
    echo 📥 Descargar desde: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado
node --version

echo.
echo 📦 Instalando dependencias del SERVER...
echo.
cd server
call npm install
if errorlevel 1 (
    echo ❌ Error instalando servidor
    pause
    exit /b 1
)

echo.
echo 📦 Instalando dependencias del CLIENT...
echo.
cd ..\client
call npm install
if errorlevel 1 (
    echo ❌ Error instalando cliente
    pause
    exit /b 1
)

cd ..

echo.
echo ================================
echo    ✅ INSTALACIÓN COMPLETADA!
echo ================================
echo.
echo PRÓXIMOS PASOS:
echo.
echo 1️⃣  Abre XAMPP y activa MySQL
echo.
echo 2️⃣  En MySQL, ejecuta el SQL de SETUP.md:
echo    - CREATE DATABASE chispa_db;
echo    - CREATE TABLE users, subjects, user_progress;
echo    - INSERT INTO subjects...
echo.
echo 3️⃣  Terminal 1 - Backend:
echo    cd server
echo    npm run dev
echo.
echo 4️⃣  Terminal 2 - Frontend:
echo    cd client
echo    npm run web
echo.
echo 📖 Para más detalles, lee: SETUP.md
echo.
pause
