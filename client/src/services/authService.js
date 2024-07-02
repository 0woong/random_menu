import axios from "axios";

const BASE_URL = "http://localhost:3001/auth";

export const signUp = async (userData) => {
  return await axios.post(`${BASE_URL}/signUp`, userData);
};

export const signIn = async (userData) => {
  return await axios.post(`${BASE_URL}/signIn/`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${BASE_URL}/delete/${id}`);
};

export const getProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
