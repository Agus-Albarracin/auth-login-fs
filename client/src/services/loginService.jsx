import axios from 'axios';

const API_URL = 'http://localhost:4100/api/usuarios';


export const createUsuario = async (usuarioData) => {
  const response = await axios.post(API_URL, usuarioData);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const getUsuarioById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};


export const updateUsuario = async (id, usuarioData) => {
  const response = await axios.put(`${API_URL}/${id}`, usuarioData);
  return response.data;
};


export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
