// pages/post/new.js
import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/PostForm.module.css";
import { UploadForm } from "@/type";
import { useRouter } from "next/router";

const onSubmit = async (form: UploadForm) => {
  const formdata = new FormData();
  formdata.append("title", form.title);
  formdata.append("username", form.author);
  formdata.append("content", form.content);
  formdata.append("category", form.category);
  //File 은 Blob의 하위 타입임
  if (form.image) {
    formdata.append("file", form.image);
  }
  //api 요청

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/create`, {
    method: "POST",
    body: formdata,
  });
};
export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<UploadForm>({
    title: "",
    category: "general",
    content: "",
    author: "",
    image: null,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData);
    alert("게시글이 제출되었습니다!"); // 게시글이 제출되었습니다!

    router.push("/");
  };

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
        <p className={styles.subtitle}>새 게시글 작성</p> {/* 새 게시글 작성 */}
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label> {/* 제목 */}
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="제목"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">카테고리</label> {/* 카테고리 */}
            <select
              id="category"
              name="category"
              value={formData.category}
              className={styles.select}
              onChange={handleChange}
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
            <label htmlFor="content">내용</label> {/* 내용 */}
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="내용"
              rows={10}
            ></textarea>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="author">작성자</label> {/* 작성자 */}
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="작성자"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">이미지</label> {/* 이미지 */}
            <div className={styles.fileInput}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.inputFile}
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
