import { usePostsWithSocket } from "@/hooks/usePostsWithSocket";
import SocketManager from "@/libs/socket";
import usePostStore from "@/store/postStore";
import "@/styles/globals.css";
import { Post } from "@/type";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  const { posts, addPost } = usePostStore();
  useEffect(() => {
    const socket = SocketManager.getSocket();
    socket.on("message", (message) => {
      console.log(message.data);
      //setPost(data)
    });
    socket.on("newPost", (newPost: Post) => {
      console.log(newPost);
      addPost(newPost);
      console.log(posts);
    });
    socket.on("connect", () => {
      console.log("connected to Server");
    });
    socket.on("disconnect", () => {
      console.log("disconnected to Server");
    });
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("newPost");
      socket.off("disconnected");

      socket.close();
    };
  }, []);
  return <Component {...pageProps} />;
}
