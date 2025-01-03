import SocketManager from "@/libs/socket";
import usePostStore from "@/store/postStore";
import { CreatePostDto, Post } from "@/type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

//소켓 & 무한 스크롤 관리 훅
export const usePostsWithSocket = () => {
  const { posts, cursor, addPost, addPosts, setCursor, setPost } =
    usePostStore();

  //좋아요
  const toggleLike = async (postId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Faile to toggle like`);
      }
      const data = await res.json();
      console.log(data);
      const socket = SocketManager.getSocket();

      //socket.emit("liked", { postId, likeData: data.liked });
    } catch (error) {
      console.log(error);
    }
  };
  //새로운 포스트 등록
  const createNewPost = async (postData: CreatePostDto) => {
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
      const socket = SocketManager.getSocket();
      //새로운 포스트가 등록됨 알리기
      socket.emit("newPost", data);
    } catch (error) {
      console.log(error);
    }
  };

  //html 요소가 보이는지 여부 체크
  const { ref, inView } = useInView();
  const loadMorePosts = async () => {
    try {
      //REST API
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
      const data = await res.json();

      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  //무한 스크롤링
  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);
  //소켓 관리
  useEffect(() => {}, []);

  return { createNewPost, loadMorePosts, posts, ref };
};
