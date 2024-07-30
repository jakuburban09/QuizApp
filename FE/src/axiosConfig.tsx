import axios from "axios";
import { AxiosRequestHeaders } from 'axios';

// Function to get the value of a cookie
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part !== undefined) {
      return part.split(';').shift() || null;
    }
  }
  return null;
}

// Configure axios
axios.interceptors.request.use((config) => {
  const token = getCookie("jwt"); // Use getCookie function to get the JWT from the cookie
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;

