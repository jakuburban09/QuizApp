// authService.js

import baseURL from "config";
import axios from "./axiosConfig";

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${baseURL}/api/check-auth`, { withCredentials: true });
    console.log("checkAuth OK");
    return response.status === 200;
  } catch (error) {
    console.error("User is not authenticated", error);
    return false;
  }
};
