import { CreatePostDto } from "@/type";

// Next.js API 라우트에 CORS 설정 추가 (pages/api/[...].ts)
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

export const createNewPost = async (postData: CreatePostDto) => {
  try {
    //새로운 포스트 등록
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    if (!response.ok) {
      throw new Error("Fail to create newPost");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const loadMorePosts = async () => {
  try {
    //REST API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
