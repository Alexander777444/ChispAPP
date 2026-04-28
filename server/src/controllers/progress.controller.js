const supabase = require('../config/supabaseClient');

// Obtiene el progreso de un alumno (todas las materias)
const getProgress = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('progress')
      .select('*, subjects(nombre, descripcion, nivel)')
      .eq('user_id', user_id);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualiza o crea el progreso de un alumno en una materia
const updateProgress = async (req, res) => {
  try {
    const { user_id, subject_id, porcentaje_avance, puntuacion, racha } = req.body;

    // Upsert: crea el registro si no existe, lo actualiza si ya existe
    const { data, error } = await supabase
      .from('progress')
      .upsert(
        [{ user_id, subject_id, porcentaje_avance, puntuacion, racha }],
        { onConflict: 'user_id, subject_id' }
      )
      .select();

    if (error) throw error;

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProgress, updateProgress };
