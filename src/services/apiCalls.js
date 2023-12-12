import axios from "axios";

const hostURL = "http://localhost:4000";

//Login
export const loginUser = async (body) => {
  return await axios.post(`${hostURL}/user`, body);
};
