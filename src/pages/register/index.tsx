import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { register } from "../api/auth";
type FormType = {
  username: string;
  email: string;
  password: string;
};
type FormAction =
  | { type: "RESET" }
  | { type: "SET"; email: string; password: string; username: string };
function reducer(state: FormType, action: FormAction): FormType {
  switch (action.type) {
    case "RESET": //빈문자열 초기화
      return {
        username: "",
        email: "",
        password: "",
      };
    case "SET":
      return {
        ...state, //기존 형식 덮어쓰기
        username: action.username,
        email: action.email,
        password: action.password,
      };
    default:
      return state;
  }
}
export default function Index() {
  const [formData, dispatch] = useReducer(reducer, {
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // /api/auth.ts
      const res = await register({
        email: formData.email,
        password: formData.password,
      });
      if (res.ok) router.push("/login");
      else {
        alert("다시 시도해보세요");
        dispatch({ type: "RESET" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <main>
        <>
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md w-full">
              <h2 className="text-2xl text-center text-gray-500">회원가입</h2>

              <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="username" className="sr-only">
                  이름
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username || ""}
                  placeholder="이름"
                  className={`p-3 mb-2 appearance-none rounded-md block border  placeholder-gray-400 text-gray-500 focus:outline-none 
              focus:ring-blue-500 focus:outline-blue-500`}
                />

                <label htmlFor="email" className="sr-only">
                  이매일
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email || ""}
                  placeholder="이메일"
                  className={`p-3 mb-2 appearance-none rounded-md block border  placeholder-gray-400 text-gray-500 focus:outline-none 
                focus:ring-blue-500 focus:outline-blue-500`}
                />

                <label htmlFor="password" className="sr-only">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password || ""}
                  placeholder="비밀번호를 입력하세요"
                  className={`p-3 mb-2 appearance-none rounded-md block border  placeholder-gray-400 text-gray-500 focus:outline-none focus:ring-blue-500 focus:outline-blue-500
                `}
                />

                <button
                  type="submit"
                  className="h-13 flex justify-center py-2 px-4 border
                 border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  제출하기
                </button>
              </form>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
