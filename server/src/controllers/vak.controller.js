const supabase = require('../config/supabaseClient');

// Guarda los resultados del Quiz VAK de un alumno
const saveVAKResult = async (req, res) => {
  try {
    const { user_id, puntaje_visual, puntaje_auditivo, puntaje_kinestesico } = req.body;

    // Determinar el estilo dominante automáticamente
    const scores = {
      Visual: puntaje_visual,
      Auditivo: puntaje_auditivo,
      Kinestesico: puntaje_kinestesico,
    };
    const estilo_dominante = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    const { data, error } = await supabase
      .from('vak_results')
      .insert([{ user_id, puntaje_visual, puntaje_auditivo, puntaje_kinestesico, estilo_dominante }])
      .select();

    if (error) throw error;

    // Actualizar el estilo de aprendizaje en el perfil del usuario
    await supabase
      .from('users')
      .update({ estilo_aprendizaje: estilo_dominante })
      .eq('id', user_id);

    res.status(201).json({ result: data[0], estilo_dominante });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtiene el último resultado VAK de un alumno
const getVAKResult = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('vak_results')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    res.status(200).json(data[0] || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveVAKResult, getVAKResult };
