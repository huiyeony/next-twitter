import Head from "next/head";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { register } from "../api/auth";
import { countdownRedirect } from "@/utils/redirect";

export default function Index() {
  const initialFormValue = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormValue);
  //회원 가입 폼 데이터 변경
  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //회원 가입
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formData);
      countdownRedirect("/login", 3);
    } catch (e) {
      alert("문제가 발생했습니다 다시 시도해 주세요..");
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
              <h2 className="text-2xl text-center text-gray-700 mb-10">
                회원가입
              </h2>

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
                  onChange={onChangeEventHandler}
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
                  onChange={onChangeEventHandler}
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
                  onChange={onChangeEventHandler}
                />

                <button
                  type="submit"
                  className="h-13 flex justify-center py-2 px-4 border
                 border-transparent text-sm font-medium rounded-md text-white bg-sky-200 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
