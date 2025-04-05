import axios from 'axios';

const API_URL = 'http://localhost:4100/api/usuarios';

/**
 * Todos los servicios deberian obtener el token desde el storage, para poder realizar solicitudes
 * El backend no permite recibir solicitudes sin un token de verificación.
 * */
const getAuthToken = () => {
  const token = localStorage.getItem("tokenRexx");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const createUsuario = async (usuarioData) => {
  const response = await axios.post(API_URL, usuarioData, getAuthToken());
  return response.data;
};

export const getUsuarios = async () => {
  const response = await axios.get(API_URL, getAuthToken());
  return response.data;
};

export const getUsuarioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthToken());
  return response.data;
};

export const updateUsuario = async (id, usuarioData) => {
  const response = await axios.put(`${API_URL}/${id}`, usuarioData, getAuthToken());
  return response.data;
};

export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthToken());
  return response.data;
};