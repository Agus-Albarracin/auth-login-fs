import axios from "axios";

const API_URL = "http://localhost:4100/api/cliente";

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

export const getClientes = async () => {
  try {
    const { data } = await axios.get(API_URL, getAuthToken());
    return data;
  } catch (error) {
    throw new Error("Error al obtener clientes");
  }
};

export const createCliente = async (cliente) => {
  try {
    const { data } = await axios.post(API_URL, cliente, getAuthToken());
    return data;
  } catch (error) {
    throw new Error("Error al crear cliente");
  }
};

export const updateCliente = async (id, cliente) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, cliente, getAuthToken());
    return data;
  } catch (error) {
    throw new Error("Error al actualizar cliente");
  }
};

export const deleteCliente = async (id) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`, getAuthToken());
    return data;
  } catch (error) {
    throw new Error("Error al eliminar cliente");
  }
};

// Crear proyecto para un cliente
export const addProyectoToCliente = async (clienteId, proyecto) => {
  try {
    const { data } = await axios.post(`${API_URL}/${clienteId}/proyectos`, proyecto, getAuthToken());
    return data;
  } catch (error) {
    throw new Error("Error al agregar proyecto");
  }
};