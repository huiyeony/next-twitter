import useAuthStore from "@/store/authStore";
import { FormError, LoginRequest, Post } from "@/type";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../api/auth";
import { countdownRedirect } from "@/utils/redirect";

export default function Index() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormError>({
    email: "",
    password: "",
    submit: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    setErrors({ email: "", password: "", submit: "" });
    const newErrors: FormError = { email: "", password: "", submit: "" };
    //이메일 입력하지 않은 경우
    if (!form?.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+\@+\S+\.+\S/.test(form.email)) {
      newErrors.email = "잘못된 이메일 형식입니다. 다시 입력하세요";
    }
    if (!form?.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.values(newErrors).every((value) => value == "")) {
      try {
        // /api/auth -> 서버에서만 실행됨
        const data = await login(form);
        countdownRedirect("/", 3);
      } catch (e) {
        console.log(e);
        setErrors({
          email: "",
          password: "",
          submit: "일치하는 로그인 정보가 없습니다. 다시 시도하세요",
        });
      }
    } else {
      console.log(newErrors);
      setErrors(newErrors);
    }
  };
  return (
    <>
      <Head>
        <title>로그인</title>
        <meta name="로그인" content="로그인 페이지" />
      </Head>
      <main>
        <div className="min-h-screen sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full mt-6 space-y-6 text-center">
            <h2 className="text-2xl">로그인</h2>

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form?.email || ""}
                placeholder="이메일"
                onChange={handleChange}
                className={`p-3 mb-2 appearance-none rounded-md block border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-400 text-gray-500 focus:outline-none 
                focus:ring-blue-500 focus:outline-blue-500`}
              />
              {errors.email && (
                <p className="px-2 mb-3 text-left text-xs text-red-500">
                  {errors.email || ""}
                </p>
              )}
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form?.password || ""}
                placeholder="비밀번호를 입력하세요"
                onChange={handleChange}
                className={`p-3 mb-2 appearance-none rounded-md block border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-400 text-gray-500 focus:outline-none focus:ring-blue-500 focus:outline-blue-500
                `}
              />
              {errors.password && (
                <p className="px-2 mb-3 text-left text-xs text-red-500">
                  {errors.password || ""}
                </p>
              )}
              <button
                type="submit"
                className="h-13 flex justify-center py-2 px-4 border
                 border-transparent text-sm font-medium rounded-md text-white bg-sky-200 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                제출하기
              </button>
              <button
                onClick={() => {
                  router.push("/register");
                }}
                className="mt-4 h-13 flex justify-center py-2 px-4 border
                 border-transparent text-sm font-medium rounded-md text-white bg-sky-200 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                회원가입하기
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
