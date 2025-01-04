import { CreatePostDto } from "@/type";

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
