import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import style from "@/styles/Login.module.css";
import Head from "next/head";
type Inputs = {
  email: string;
  password: string;
};
export default function Index() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`로그인 실패`);
      }
      const { token } = await response.json();
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>로그인</title>
        <meta name="로그인" content="로그인 페이지" />
      </Head>
      <main>
        <div className={style.container}>
          <div className={style.wrapper}>
            <h2 className={style.heading}>로그인</h2>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="이메일"
                className={style.input}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+.[^\s@]$/,
                    message: "이메일 양식 틀렸어요.",
                  },
                })}
              />

              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className={style.input}
                {...register("password", { required: true })}
              />

              <button type="submit" className={style.button}>
                제출하기
              </button>
              <button
                onClick={() => {
                  router.push("/register");
                }}
                className={style.button}
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
