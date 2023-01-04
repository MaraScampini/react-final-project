import axios from "axios";
const URL = "https://backend-final-project-production.up.railway.app/";

export const userLogin = async (body) => {
  let res = await axios.post(`${URL}auth/login`, body);
    let jwt = res.data.jwt;

    localStorage.setItem("jwt", jwt);
};

export const userRegister = async (body) => {
  let res = await axios.post(`${URL}auth/register`, body)
}
