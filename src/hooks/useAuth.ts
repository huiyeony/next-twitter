import { AuthAPI } from "@/pages/api/auth";
import { LoginRequest, RegisterRequest, User } from "@/type";
import { ApiError } from "next/dist/server/api-utils";
import { useCallback, useState } from "react";

export const useAuth = () => {
  const [error, setError] = useState<ApiError>();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  //함수 메모이제이션
  const register = useCallback(async (req: RegisterRequest) => {
    try {
      setIsLoading(true);
      setUser(undefined);

      const res = await AuthAPI.register(req);
      console.log(res.user);
      setUser(res.user);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (req: LoginRequest) => {
    try {
      setIsLoading(true);
      setUser(undefined);

      const res = await AuthAPI.login(req);
      console.log(res.message);

      //setUser ?
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setUser(undefined);
      const res = await AuthAPI.logout();
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
  };
};
