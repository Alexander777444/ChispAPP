const supabase = require('../config/supabaseClient');

const getSubjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('subjects') // Tabla de materias en Supabase
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const { nombre, descripcion, nivel } = req.body;
    
    const { data, error } = await supabase
      .from('subjects')
      .insert([{ nombre, descripcion, nivel }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject
};
