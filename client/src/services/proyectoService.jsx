import axios from "axios";

const API_URL = "http://localhost:4100/api/proys";

/**
 * Todos los servicios deberían obtener el token desde el storage, 
 * para poder realizar solicitudes. 
 * El backend no permite recibir solicitudes sin un token de verificación.
 */
const getAuthToken = () => {
  const token = localStorage.getItem("tokenRexx");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProyectosByCliente = async (clienteId) => {
  const { data } = await axios.get(`${API_URL}?cliente_id=${clienteId}`, getAuthToken());
  return data;
};

export const createProyecto = async (proyecto) => {
  const { data } = await axios.post(API_URL, proyecto, getAuthToken());
  return data;
};

export const updateProyecto = async (id, proyecto) => {
  const { data } = await axios.put(`${API_URL}/${id}`, proyecto, getAuthToken());
  return data;
};

export const deleteProyecto = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, getAuthToken());
  return data;
};
