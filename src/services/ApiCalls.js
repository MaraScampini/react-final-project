import axios from "axios";
const URL = "https://backend-final-project-production.up.railway.app/";

export const userLogin = async (body) => {
  let res = await axios.post(`${URL}auth/login`, body);
    let jwt = res.data.jwt;

    localStorage.setItem("jwt", jwt);
};

export const userRegister = async (body) => {
  await axios.post(`${URL}auth/register`, body)
}

export const getProfile = async () => {
  const token = localStorage.getItem("jwt")
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  try {
    let res = await axios.get(`${URL}user/profile`, config);
    let data = res.data.user
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const editProfile = async (body) => {
  const token = localStorage.getItem("jwt");
  console.log(token)
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
try {
  await axios.patch(`${URL}user/profile`, body, config);
  console.log("first")
} catch (error) {
  console.error(error);
}
}

export const editPassword = async (body) => {
  const token = localStorage.getItem("jwt");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.patch(`${URL}user/password`, body, config);
    console.log("first");
  } catch (error) {
    console.error(error);
  }
};