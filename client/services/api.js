import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==================== USERS ====================

export const usersAPI = {
  // Registro
  register: async (email, name, password, grade = 'primaria') => {
    try {
      const response = await api.post('/users/register', {
        email,
        name,
        password,
        grade
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener perfil
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar VAK style
  updateVAKStyle: async (userId, vakStyle) => {
    try {
      const response = await api.put(`/users/${userId}/vak-style`, { vakStyle });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// ==================== SUBJECTS ====================

export const subjectsAPI = {
  // Obtener todas las materias
  getAllSubjects: async () => {
    try {
      const response = await api.get('/subjects');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener materia por ID
  getSubjectById: async (subjectId) => {
    try {
      const response = await api.get(`/subjects/${subjectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener progreso del usuario
  getUserProgress: async (userId) => {
    try {
      const response = await api.get(`/subjects/progress/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Actualizar progreso
  updateProgress: async (userId, subjectId, lessonsCompleted, totalLessons) => {
    try {
      const response = await api.put(
        `/subjects/${subjectId}/progress/${userId}`,
        { lessonsCompleted, totalLessons }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// ==================== HEALTH CHECK ====================

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export default api;
