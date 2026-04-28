const supabase = require('../config/db');

// Obtener todas las materias
const getAllSubjects = async (req, res) => {
  try {
    const { data: subjects, error } = await supabase
      .from('subjects')
      .select('id, name, description, emoji');

    if (error) throw error;

    res.status(200).json({ subjects });
  } catch (error) {
    console.error('Error obteniendo materias:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener una materia por ID
const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const { data: subjects, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', subjectId);

    if (error) throw error;

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.status(200).json({ subject: subjects[0] });
  } catch (error) {
    console.error('Error obteniendo materia:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener progreso del usuario en una materia
const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: progress, error } = await supabase
      .from('user_progress')
      .select('*, subjects(name)')
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json({ progress: progress || [] });
  } catch (error) {
    console.error('Error obteniendo progreso:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar progreso del usuario
const updateProgress = async (req, res) => {
  try {
    const { userId, subjectId } = req.params;
    const { lessonsCompleted, totalLessons } = req.body;

    if (lessonsCompleted === undefined || totalLessons === undefined) {
      return res.status(400).json({ 
        error: 'lessonsCompleted y totalLessons son requeridos' 
      });
    }

    const percentageComplete = (lessonsCompleted / totalLessons) * 100;

    // Verificar si existe el registro
    const { data: existing, error: checkError } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('subject_id', subjectId);

    if (checkError) throw checkError;

    if (existing && existing.length > 0) {
      // Actualizar
      const { error: updateError } = await supabase
        .from('user_progress')
        .update({
          lessons_completed: lessonsCompleted,
          percentage_complete: percentageComplete
        })
        .eq('user_id', userId)
        .eq('subject_id', subjectId);

      if (updateError) throw updateError;
    } else {
      // Crear nuevo registro
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert([{
          user_id: userId,
          subject_id: subjectId,
          lessons_completed: lessonsCompleted,
          percentage_complete: percentageComplete
        }]);

      if (insertError) throw insertError;
    }

    res.status(200).json({ 
      message: 'Progreso actualizado',
      percentageComplete 
    });
  } catch (error) {
    console.error('Error actualizando progreso:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  getUserProgress,
  updateProgress
};
