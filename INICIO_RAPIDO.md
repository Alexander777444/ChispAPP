# 🎯 CHISPA - GUÍA RÁPIDA (5 MINUTOS)

## ❓ ¿QUÉ PASÓ?

**ANTES (Situación):**
- ❌ client/package.json VACÍO
- ❌ server/package.json con Supabase (incorrecto)
- ❌ server/db.js VACÍO
- ❌ Nothing works

**AHORA (Arreglado):**
- ✅ Todo configurado para funcionar CON SUPABASE
- ✅ Backend listo con Supabase
- ✅ Frontend listo con Expo
- ✅ Guía paso a paso incluida

---

## 🚀 PARA HACER QUE FUNCIONE (AHORA)

### Opción A: Instalación Automática (WINDOWS)
```
Double-click: install.bat
```
Esto instala automáticamente todo.

### Opción B: Instalación Manual
```bash
# Terminal 1
cd server
npm install
npm run dev

# Terminal 2 (NUEVA terminal)
cd client
npm install
npm run web
```

---

## 📋 PASOS REQUERIDOS (5 minutos)

### 1. **Configurar Supabase** (2 min)

**Opción 1: Rápido (Sin BD propia)**
- Ve a [supabase.com](https://supabase.com)
- Crea cuenta (gratuita)
- Crea proyecto
- Copia URL y KEY
- Pega en `server/.env`

**Opción 2: Completo (Con tablas)**
Después, en Supabase SQL Editor, pega TODO esto:

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

-- Tabla: progreso
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

Luego click **Run**.

### 2. **Configurar .env** (1 min)

Abre `server/.env` y actualiza:

```env
# Supabase - CAMBIAR ESTOS
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anonima

# Resto igual
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
```

Dónde obtener las claves:
1. Entra a tu proyecto Supabase
2. Ve a **Settings → API**
3. Copia **Project URL** y **Anon Key**
4. Pega en el .env arriba

### 3. **Instalar Backend** (1-2 min)

```bash
cd Chispapp/server
npm install
npm run dev
```

Espera a ver:
```
✅ Servidor corriendo en http://localhost:3001
📡 API disponible en http://localhost:3001/api
✅ Conexión a Supabase exitosa
```

### 4. **Instalar Frontend** (1-2 min)

**NUEVA terminal:**

```bash
cd Chispapp/client
npm install
npm run web
```

Espera a que abra navegador automáticamente, o ve a:
```
http://localhost:19000
```

---

## ✅ ¿CÓMO SÉ QUE FUNCIONA?

### Backend OK ✅
Visita en navegador:
```
http://localhost:3001/api/health
```
Deberías ver:
```json
{
  "status": "OK",
  "message": "✅ Servidor funcionando correctamente",
  "timestamp": "2024-..."
}
```

### Frontend OK ✅
- App abre en navegador
- Ves "Welcome to Chispa"
- Botón "Empezar a aprender" funciona
- Vas a pantalla VAK

### TODO FUNCIONA ✅
- Respondes 3 preguntas VAK
- Click "Terminar"
- Ves pantalla Home con materias
- 🎉 ¡BETA FUNCIONAL!

---

## 📁 ARCHIVOS CLAVE

| Archivo | Propósito | Status |
|---------|----------|--------|
| `client/package.json` | Dependencias frontend | ✅ Reconstruido |
| `server/package.json` | Dependencias backend | ✅ Actualizado |
| `server/.env` | Config BD MySQL | ✅ Creado |
| `client/.env` | Config API URL | ✅ Creado |
| `client/app.json` | Config Expo | ✅ Creado |
| `SETUP.md` | Guía detallada | ✅ Creado |
| `install.bat` | Instalador automático | ✅ Creado |

---

## 🆘 ERRORES COMUNES

### "Cannot find module..."
```bash
cd server (o client)
rm -rf node_modules package-lock.json
npm install
```

### "Connection refused" en MySQL
```bash
# En XAMPP: Start MySQL
# O manual: mysql -u root -p
```

### "Port 3001 already in use"
- Cambia `PORT=3002` en `server/.env`
- O mata el proceso en ese puerto

### Ver más errores →
**Lee:** SETUP.md (sección Troubleshooting)

---

## 🎯 PRÓXIMAS FASES

**Fase 2:** Autenticación real (JWT)  
**Fase 3:** Más contenido educativo  
**Fase 4:** Diseño final UI/UX  
**Fase 5:** Publicar en App Stores

---

## 📞 SOPORTE

Para problemas detallados:
- Lee: **SETUP.md** (Guía completa)
- Lee: **ESTADO_PROYECTO.md** (Estado actual)
- Revisa consola para mensajes de error

---

**¿LISTO? Sigue estos 3 pasos en orden:**

1. ⚙️ Crear BD MySQL (SQL arriba)
2. 🖥️ `cd server && npm install && npm run dev`
3. ⚛️ `cd client && npm install && npm run web`

**¡Listo!** 🚀
