import {
  AxiosError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/type";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export class AuthAPI {
  static async login(req: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await api.post("/auth/login", req);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message,
          status: error.response?.status,
        } as AxiosError;
      }
      //알수 없는 애러
      throw error;
    }
  }
  static async logout(): Promise<void> {
    try {
      const { data } = await api.post("/auth/logout");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data.message,
          status: error.response?.status,
        } as AxiosError;
      }
      throw error;
    }
  }
  static async register(req: RegisterRequest): Promise<RegisterResponse> {
    try {
      console.log(process.env.NEXT_PUBLIC_BASE_URL);
      const { data } = await api.post("/auth/register", req);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data.message,
          status: error.response?.status,
        } as AxiosError;
      }
      //알 수 없는 에러
      throw error;
    }
  }
}
