import axios from 'axios';

const API = axios.create({
  baseURL: 'https://stayfinder-backend-1.onrender.com/', // Your backend URL
});

// Optional: Attach JWT token if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
