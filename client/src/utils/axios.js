import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://berkay-akar-hotel-api.onrender.com/',
  withCredentials: true,
});

export default axiosInstance;
