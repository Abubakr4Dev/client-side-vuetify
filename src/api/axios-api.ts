import axios from "axios";
import {
  ILoginInput,
  ILoginResponse,
  IRegisterInput,
  IRegisterResponse,
} from "./types";

const BASE_URL = "http://localhost:5000";

const authApi = axios.create({
  headers: {
    // "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  },
  baseURL: BASE_URL,
  withCredentials: true,
});

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// authApi.defaults.headers.common["Content-Type"] = "application/json";

export const registerUserFn = async (user: IRegisterInput) => {
  const response = await authApi.post<IRegisterResponse>("register", user);
  return response.data;
};

export const loginUserFn = async (user: ILoginInput) => {
  console.log("login method");
  const response = await authApi.post<ILoginResponse>("login", user);
  return response.data;
};

