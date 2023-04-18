import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ebaby-api.onrender.com/api',
});

export default api;
