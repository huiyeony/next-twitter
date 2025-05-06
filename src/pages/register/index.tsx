import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/Register.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Index() {
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error();
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.log("회원가입 실패");
    }
  };
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();
  //회원 가입

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <main>
        <>
          <div className={style.container}>
            <div className={style.wrapper}>
              <h2 className={style.heading}>회원가입</h2>

              <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <input
                  id="username"
                  type="text"
                  placeholder="이름"
                  className={style.input}
                  {...register("username", { required: true })}
                />
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
              </form>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
