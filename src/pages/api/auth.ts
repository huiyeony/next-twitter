import { LoginRequest, RegisterRequest } from "@/type";
//이 코드는 서버에서만 실행됨
export const login = async (req: LoginRequest) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      throw new Error(`로그인 실패`);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
export const register = async (req: RegisterRequest) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    );
    if (!res.ok) {
      throw new Error(`회원가입 실패`);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
