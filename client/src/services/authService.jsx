import axios from 'axios';

const API_URL = 'http://localhost:4010/api';

export const login = async (username, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { username, password });
  return data;
};

export const register = async (username, password) => {
  const { data } = await axios.post(`${API_URL}/register`, { username, password });
  return data;
};
