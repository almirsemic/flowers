import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://flowrspot-api.herokuapp.com/'
});

export default axiosInstance;
