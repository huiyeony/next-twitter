import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { register } from "../api/auth";

export default function Index() {
  const router = useRouter();
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: "",
    });
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: "",
    };

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+\@+\S+\.+\S/.test(formData.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    } else if (!formData.username) {
      newErrors.username = "이름을 입력해주세요";
    } else if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (!(formData.password == formData.confirmPassword)) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    return newErrors;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.values(newErrors).every((value) => value == "")) {
      try {
        // /api/auth.ts

        const data = await register({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        console.log(data);
        router.push("/login");
      } catch (e) {
        setErrors({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          submit: "회원가입 도중 오류가 발생했습니다.",
        });
      }
    } else {
      setErrors(newErrors);
    }
    console.log(errors);
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
                  onChange={handleChange}
                  className={`p-3 mb-2 appearance-none rounded-md block border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-400 text-gray-500 focus:outline-none 
              focus:ring-blue-500 focus:outline-blue-500`}
                />
                {errors.username && (
                  <p className="px-2 mb-3 text-left text-xs text-red-500">
                    {errors.username || ""}
                  </p>
                )}
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
                  value={formData.password || ""}
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
                <label htmlFor="password" className="sr-only">
                  확인 비밀번호
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword || ""}
                  placeholder="비밀번호를 재입력하세요"
                  onChange={handleChange}
                  className={`p-3 mb-2 appearance-none rounded-md block border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-400 text-gray-500 focus:outline-none focus:ring-blue-500 focus:outline-blue-500
                `}
                />
                {errors.confirmPassword && (
                  <p className="px-2 mb-3 text-left text-xs text-red-500">
                    {errors.confirmPassword || ""}
                  </p>
                )}
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
