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
  return await axios.get(`${hostURL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Actualizar perfil
export const updateUser = async (token, body) => {
  return await axios.put(`${hostURL}/user`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Actualizar la contraseña
export const updatePassword = async (token, body) => {
  return await axios.patch(`${hostURL}/user/password`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Inactivar la cuenta
export const deactivateAccount = async (token, body) => {
  return  await axios.put(`${hostURL}/user/account`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Todas las actividades
export const getAllActivities = async () => {
  // Conectamos la API a la base de datos
  return await axios.get (`${hostURL}/activity/all`);
}

// Todas las actividades por el type
export const getActivityByType = async (type) => {
  // Conectamos la API a la base de datos
  return await axios.get (`${hostURL}/activity/${type}`);
}

export const disponibilityDate = async ( body, token) => {
  return await axios.post(`${hostURL}/appointment/disponibility-activity`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};