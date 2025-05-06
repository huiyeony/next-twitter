// pages/post/new.js
import { useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/PostForm.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
type Inputs = {
  category: string;
  title: string;
  content: string;
  username: string;
  image: File | null;
};

export default function Page() {
  const router = useRouter();
  const onSubmit = async (data: Inputs) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("username", data.username);
    formdata.append("content", data.content);
    formdata.append("category", data.category);
    if (data.image) formdata.append("file", data.image);

    //POST
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/create`,
      {
        method: "POST",
        body: formdata,
      }
    );
    if (!response.ok) {
      throw new Error("게시글을 등록 못해씀");
      return;
    }
    router.push("/");
  };
  const { register, handleSubmit } = useForm<Inputs>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>게시글 등록</title>
        <meta name="description" content="게시글 등록 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>게시판</h1> {/* 게시판 */}
        </div>
        <p className={styles.subtitle}>새 게시글 작성</p>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="title"
              required
              className={styles.input}
              placeholder="제목"
              {...register("title", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <select
              id="category"
              className={styles.select}
              {...register("category")}
              defaultValue="general"
            >
              <option value="general">일반</option>
              <option value="study">공부</option>
              <option value="relation">인간관계</option>
              <option value="love">연애/결혼</option>
              <option value="family">가족</option>
              <option value="money">재태크</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <textarea
              id="content"
              className={styles.textarea}
              placeholder="내용"
              rows={10}
              {...register("content", { required: true })}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="author"
              className={styles.input}
              placeholder="작성자"
              {...register("username")}
              defaultValue={"Anonymous"}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">이미지</label> {/* 이미지 */}
            <div className={styles.fileInput}>
              <input
                type="file"
                id="image"
                accept="image/*"
                className={styles.inputFile}
                {...register("image")}
              />
              <span className={styles.fileLabel}>파일 선택</span>{" "}
              {/* 파일 선택 */}
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              게시하기 {/* 게시하기 */}
            </button>
            <button type="button" className={styles.cancelButton}>
              취소 {/* 취소 */}
            </button>
          </div>
        </form>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
