import axios from "axios";

const useLocal = true;
const baseUrl = useLocal
  ? "http://localhost:4941/api/v1/"
  : "http://csse-s365.canterbury.ac.nz:4001/api/v1/";

const TOKEN_STORAGE_NAME = "user_auth_token";
const USER_ID_STORAGE_NAME = "user_id";

const TOKEN_HEADER_NAME = "X-Authorization";

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_NAME);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_STORAGE_NAME);
};

const getAuthHeader = () => {
  const token = getAuthToken();
  if (!token) {
    return {};
  }
  return {
    [TOKEN_HEADER_NAME]: token
  };
};

const api = {
  setUserAndToken(id, token) {
    localStorage.setItem(USER_ID_STORAGE_NAME, id);
    localStorage.setItem(TOKEN_STORAGE_NAME, token);

    console.log(localStorage.getItem(USER_ID_STORAGE_NAME));
    console.log(localStorage.getItem(TOKEN_STORAGE_NAME));
  },
  clearUserAndToken() {
    localStorage.removeItem(USER_ID_STORAGE_NAME);
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  },
  async post(resource, data) {
    const result = await axios.post(`${baseUrl}${resource}`, data, {
      headers: getAuthHeader()
    });
    return result.data;
  },
  async get(resource) {
    const result = await axios.get(`${baseUrl}${resource}`, {
      headers: getAuthHeader()
    });
    return result.data;
  },
  endpoint(resource) {
    return `${baseUrl}${resource}`;
  }
};

export default api;
