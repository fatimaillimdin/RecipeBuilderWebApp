/** @format */

import axios from "axios";

export const apiEndPoints = {
  BASE_URL: "http://localhost:502",
  LOGIN: "/api/users/login",
  CREATE_USER: "/api/users/signup",
  RECIPE: "/api/recipes",
  RECIPE_SEARCH: "/api/recipes/search",
  RECIPE_LIKE: (id) => `/api/recipes/like/${id}`,
  RECIPE_DELETE: (id) => `/api/recipes/${id}`,
};

const api = axios.create({
  baseURL: apiEndPoints.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default api;
