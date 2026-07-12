import axios from "axios";

// Backend runs on port 5001 locally
const API_BASE_URL = "http://localhost:5001/api";

// Backend mounts auth routes under /api/auth
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
  return response.data;
};