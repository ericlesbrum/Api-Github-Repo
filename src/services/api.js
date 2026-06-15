import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getUser = async (login) => api.get(`/users?login=${login}`);

export const getRepos = async (login) => api.get(`/users/${login}/repos`);

export default api;
