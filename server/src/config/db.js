const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Variables de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Validar que existan las variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Falta configuración de Supabase:');
  console.error('   - SUPABASE_URL');
  console.error('   - SUPABASE_ANON_KEY');
  console.error('📋 Agrega estas variables a server/.env');
  process.exit(1);
}

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test de conexión
supabase.auth.getSession()
  .then(() => {
    console.log('✅ Conexión a Supabase exitosa');
  })
  .catch(err => {
    console.error('❌ Error conectando a Supabase:', err.message);
    console.log('📋 Verifica:');
    console.log('   1. URL de Supabase sea correcta');
    console.log('   2. API Key sea correcta');
    console.log('   3. Proyecto de Supabase esté activo');
  });

module.exports = supabase;
