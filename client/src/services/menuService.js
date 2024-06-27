import axios from "axios";

const BASE_URL = "http://localhost:3001/menu";

export const getMenus = async () => {
  return await axios.get(BASE_URL);
};

export const addMenu = async (menuData) => {
  return await axios.post(`${BASE_URL}/upload`, menuData);
};

export const deleteMenu = async (id) => {
  return await axios.delete(`${BASE_URL}/delete/${id}`);
};

export const updateMenu = async (id, menuData) => {
  return await axios.put(`${BASE_URL}/update/${id}`, menuData);
};
