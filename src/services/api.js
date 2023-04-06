import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rest-api-ebaby.herokuapp.com/api',
});

export default api;
