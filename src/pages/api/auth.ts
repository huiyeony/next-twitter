import { LoginRequest, RegisterRequest } from "@/type";
//이 코드는 서버에서만 실행됨
export const login = async (req: LoginRequest) => {
  try {
    console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL); //환경변수 안전하게 접근
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      throw new Error(`로그인 실패`);
    }
    const data = await res.json();
    console.log(data);
    return data;
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
    const data = res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
