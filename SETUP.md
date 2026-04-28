# 🚀 GUÍA COMPLETA - Instalación y Ejecución de Chispa (BETA)

> **Actualizado:** Versión con Supabase  
> **Rama:** `feature/InicioDeLaDemo`  
> **Objetivo:** Hacer funcionar completamente frontend + backend

---

## 📋 REQUISITOS PREVIOS

### ✅ Software Necesario
- **Node.js** (v14+) - [Descargar](https://nodejs.org/)
- **Git** (opcional, pero recomendado)
- **Editor:** VS Code (recomendado)
- **Cuenta Supabase** (gratis) - [supabase.com](https://supabase.com)

### ✅ Verificar Instalación
Abre Terminal/PowerShell y ejecuta:

```bash
node --version  # Debería mostrar v14+
npm --version   # Debería mostrar 6+
```

---

## 🔧 PASO 1: CONFIGURAR SUPABASE (10 minutos)

### A. Crear Cuenta y Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click "Sign Up" (o inicia sesión)
3. Crea nuevo proyecto:
   - Nombre: "chispa-beta" (o lo que prefieras)
   - Contraseña: genera una (la copiarás)
   - Región: Selecciona la más cercana a ti

### B. Obtener Credenciales

Cuando se cree el proyecto:

1. Ve a **Settings** → **API**
2. Copia las credenciales:
   ```
   SUPABASE_URL = https://xxx.supabase.co
   SUPABASE_ANON_KEY = eyJhbGc...
   ```

### C. Guardar en server/.env

Abre `Chispapp/server/.env` y actualiza:

```env
# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anonima

# Servidor
PORT=3001
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:8081
```

✅ **Credenciales configuradas!**

---

## 🗄️ PASO 2: CREAR TABLAS EN SUPABASE (5 minutos)

### A. Abrir SQL Editor

En Supabase:
1. Ve a **SQL Editor**
2. Click en **New Query**
3. Pega TODO esto:

```sql
-- Tabla: usuarios
CREATE TABLE users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  grade VARCHAR(50) DEFAULT 'primaria',
  vak_style VARCHAR(3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: materias
CREATE TABLE subjects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: progreso del usuario
CREATE TABLE user_progress (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id BIGINT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  lessons_completed INT DEFAULT 0,
  percentage_complete INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba
INSERT INTO subjects (name, description, emoji) 
VALUES ('Inglés', 'Aprende inglés de forma interactiva', '🌍');
```

### B. Ejecutar Query

1. Click en **Run** (o Ctrl+Enter)
2. Espera a que termine
3. Deberías ver "Successfully executed"

✅ **Base de datos creada!**

---

## 🖥️ PASO 3: INSTALAR Y EJECUTAR BACKEND (2 minutos)

### A. Abrir terminal en `Chispapp/server`

```bash
cd Chispapp/server
```

### B. Instalar dependencias

```bash
npm install
```

**Debería descargar:**
- express
- @supabase/supabase-js
- cors
- dotenv
- nodemon

### C. Iniciar el servidor

```bash
npm run dev
```

**Output esperado:**
```
✅ Servidor corriendo en http://localhost:3001
📡 API disponible en http://localhost:3001/api
✅ Conexión a Supabase exitosa
```

🎉 **¡El backend está corriendo!**

---

## ⚛️ PASO 4: INSTALAR Y EJECUTAR FRONTEND (2 minutos)

### A. Abrir NUEVA terminal en `Chispapp/client`

```bash
cd Chispapp/client
```

### B. Instalar dependencias

```bash
npm install
```

**Esto va a tardar 2-3 minutos. Paciencia...**

### C. Iniciar la app (WEB para testing rápido)

```bash
npm run web
```

**Opciones:**
- `npm run web` - Versión web en navegador (más rápido para testing)
- `npm run android` - Versión Android (requiere emulador)
- `npm run ios` - Versión iOS (solo en Mac)

**Output esperado:**
```
› Press i to open in iOS
› Press a to open in Android
› Press w to open in web

 ✅ Expo dev server is running at http://localhost:19000
```

---

## ✅ PASO 5: VERIFICAR QUE TODO FUNCIONA

### A. Verificar Backend

**Backend está OK si:**
- Abre: http://localhost:3001/api/health
- Ves: `{"status":"OK","message":"✅ Servidor funcionando correctamente",...}`

### B. Verificar Frontend

**Frontend está OK si:**
- Ve un navegador con la app
- Muestra pantalla "Welcome to Chispa" con botón "Empezar a aprender"

### C. Probar Flujo Completo

1. Click en **"Empezar a aprender"**
2. Ve pantalla VAK con 3 preguntas
3. Responde las 3 preguntas
4. Click "Terminar"
5. Ve pantalla Home con materias
6. ✅ **¡TODO FUNCIONA!**

---

## 🐛 TROUBLESHOOTING

### ❌ "Error conectando a Supabase"

**Problema:** Credenciales incorrectas o proyecto no activo

**Solución:**
1. Verifica `server/.env` tenga URL y KEY correctas
2. En Supabase, ve a Settings → API
3. Copia nuevamente las credenciales

### ❌ "EADDRINUSE: address already in use :::3001"

**Problema:** Puerto 3001 ya está en uso

**Solución:**
```bash
# Cambia el puerto en server/.env
PORT=3002
# O mata el proceso
# Windows: taskkill /PID <PID> /F
# Mac/Linux: lsof -ti:3001 | xargs kill -9
```

### ❌ "npm ERR! code ERESOLVE"

**Problema:** Conflicto de versiones

**Solución:**
```bash
npm install --legacy-peer-deps
```

### ❌ "Module not found" en frontend

**Problema:** Dependencias no instaladas correctamente

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Cannot find table 'users'" en backend

**Problema:** Tablas no creadas en Supabase

**Solución:**
1. Ve a Supabase → SQL Editor
2. Copia y pega el SQL de arriba
3. Click Run

---

## 📱 SIGUIENTE: CONECTAR A DISPOSITIVO FÍSICO

Una vez que funciona en WEB, puedes:

### Para Android:
1. Instala Expo Go desde Play Store
2. En terminal: `npm run android`
3. Escanea QR con Expo Go

### Para iOS:
1. Instala Expo Go desde App Store
2. En terminal: `npm run ios`
3. Escanea QR con Expo Go

---

## 🎯 RESUMEN DE COMANDOS

### Terminal 1 (Backend)
```bash
cd Chispapp/server
npm install
npm run dev  # Corre siempre en background
```

### Terminal 2 (Frontend)
```bash
cd Chispapp/client
npm install
npm run web
```

---

## 📞 SOPORTE

Si algo no funciona:
1. Verifica que Supabase está conectado: revisa consola del servidor
2. Verifica que el backend está corriendo: http://localhost:3001/api/health
3. Verifica que el frontend está en: http://localhost:19000 (Expo)
4. Revisa la consola para mensajes de error

---

## ✨ PRÓXIMOS PASOS (Después de que funcione)

- [ ] Implementar autenticación real (JWT tokens)
- [ ] Agregar más temas de estudio
- [ ] Diseñar interfaz final
- [ ] Agregar animaciones
- [ ] Publicar en App Stores

---

**Versión:** 1.0.0 (Supabase)  
**Última actualización:** 2024  
**Estado:** BETA FUNCIONAL ✅
