import axios from "axios";
const URL = "https://backend-final-project-production.up.railway.app/";

export const userLogin = async (body) => {
  let res = await axios.post(`${URL}auth/login`, body);
  let jwt = res.data.jwt;

  localStorage.setItem("jwt", jwt);
};

export const userRegister = async (body) => {
  await axios.post(`${URL}auth/register`, body);
};

export const getProfile = async () => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios.get(`${URL}user/profile`, config);
    let data = res.data.user;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editProfile = async (body) => {
  const token = localStorage.getItem("jwt");
  console.log(token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.patch(`${URL}user/profile`, body, config);
    console.log("first");
  } catch (error) {
    console.error(error);
  }
};

export const editPassword = async (body) => {
  const token = localStorage.getItem("jwt");
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

export const getExercises = async () => {
  try {
    let res = await axios.get(`${URL}exercise`);
    let data = res.data.exercises;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExercisesByMaterial = async (material) => {
  try {
    let res = await axios.get(`${URL}exercise/material/${material}`);
    let data = res.data.exercises;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExercisesByMuscle = async (muscle) => {
  try {
    let res = await axios.get(`${URL}exercise/muscle/${muscle}`);
    let data = res.data.exercises;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExercisesDoubleFilter = async (filters) => {
  try {
    let res = await axios.get(`${URL}exercise/mat_mus/${filters}`);
    let data = res.data.exercises;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExerciseById = async (id) => {
  try {
    let res = await axios.get(`${URL}exercise/${id}`);
    let data = res.data.exercise;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getExerciseByName = async (name) => {
  try {
    let res = await axios.get(`${URL}exercise/name/${name}`);
    let data = res.data.exercises;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyRoutines = async () => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios.get(`${URL}routine/all`, config);
    let data = res.data.routines;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSetsByRoutine = async (id) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios.get(`${URL}set/${id}`, config);
    let data = res.data.sets;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getRoutineById = async (id) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios.get(`${URL}routine/${id}`, config);
    let data = res.data.routine;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editSet = async (body) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.patch(`${URL}set/edit`, body, config);
  } catch (error) {
    console.error(error);
  }
};

export const newSet = async (body) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    let res = await axios.post(`${URL}set/new`, body, config);
    let data = res.data.newSet;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSet = async (body) => {
  const token = localStorage.getItem("jwt");
    
  try {
    await axios.delete(`${URL}set/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: body
    });
  } catch (error) {
    console.error(error);
  }
};

export const newRoutine = async (body) => {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let res = await axios.post(`${URL}routine/new`, body, config);
      let data = res.data.newRoutine;
      return data;
    } catch (error) {
      console.error(error);
    }
}

export const editRoutine = async (body) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios.patch(`${URL}routine/edit`, body, config);
  } catch (error) {
    console.error(error);
  }
}

export const deleteRoutine = async (body) => {
  const token = localStorage.getItem("jwt");

  try {
    await axios.delete(`${URL}routine/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: body,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async () => {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let res = await axios.get(`${URL}user/all`, config);
      let data = res.data.users;
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
}

export const deleteUser = async (body) => {
  const token = localStorage.getItem("jwt");

  try {
    await axios.delete(`${URL}user/delete`, {
      headers: { Authorization: `Bearer ${token}` },
      data: body,
    });
  } catch (error) {
    console.error(error);
  }
};