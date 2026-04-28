const supabase = require('../config/db');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { email, name, password, grade } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ 
        error: 'Email, nombre y contraseña son requeridos' 
      });
    }

    // Verificar si el usuario ya existe
    const { data: existingUsers } = await supabase
      .from('users')
      .select('id')
      .eq('email', email);

    if (existingUsers && existingUsers.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Crear usuario
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        email, 
        name, 
        password, 
        grade: grade || 'primaria' 
      }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      userId: data[0].id,
      user: { id: data[0].id, email: data[0].email, name: data[0].name }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error) throw error;

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const user = users[0];
    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        grade: user.grade,
        vakStyle: user.vak_style
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener perfil
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, name, grade, vak_style')
      .eq('id', userId);

    if (error) throw error;

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ user: users[0] });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estilo VAK
const updateVAKStyle = async (req, res) => {
  try {
    const { userId } = req.params;
    const { vakStyle } = req.body;

    if (!vakStyle) {
      return res.status(400).json({ error: 'VAK style es requerido' });
    }

    const { error } = await supabase
      .from('users')
      .update({ vak_style: vakStyle })
      .eq('id', userId);

    if (error) throw error;

    res.status(200).json({ message: 'Estilo VAK actualizado', vakStyle });
  } catch (error) {
    console.error('Error actualizando VAK:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateVAKStyle
};
