import axios from "axios";

const hostURL = "http://localhost:4000";

//Login
export const loginUser = async (body) => {
  return await axios.post(`${hostURL}/user`, body);
};

//Crear un nuevo usuario
export const createUser = async (body) => {
  return await axios.post(`${hostURL}/user/register`, body);
};

//Perfil: Recuperamos la información del usuario
export const profileUser = async (token) => {
  return axios.get(`${hostURL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Actualizar perfil
export const updateUser = async (token, body) => {
  return axios.put(`${hostURL}/user`, body,  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};