import SocketManager from "@/libs/socket";
import { createNewPost } from "@/pages/api/post";
import usePostStore from "@/store/postStore";
import { CreatePostDto } from "@/type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

//소켓 & 무한 스크롤 관리 훅
export const usePostsWithSocket = () => {
  const { posts, setPost } = usePostStore();
  const createPost = async (postData: CreatePostDto) => {
    const data = await createNewPost(postData);
    //서버에 알림
    const socket = SocketManager.getSocket();
    socket.emit("newPost", data);
  };

  // const loadPosts = async () => {
  //   const data = await loadMorePosts();
  //   setPost(data);
  // };
  //html 요소가 보이는지 여부 체크
  const { ref, inView } = useInView();

  //무한 스크롤링
  // useEffect(() => {
  //   if (inView) {
  //     loadMorePosts();
  //   }
  // }, [inView]);
  //소켓 관리
  useEffect(() => {}, []);

  return { createPost, posts, ref };
};
