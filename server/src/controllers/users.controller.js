const supabase = require('../config/supabaseClient');

const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users') // Asegúrate de que esta tabla exista en tu base de datos de Supabase
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, grado, estilo_aprendizaje } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ nombre, grado, estilo_aprendizaje }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser
};
