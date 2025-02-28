import BottomNavigation from "@/components/bottmNavigation";
import SocketManager from "@/libs/socket";
import { useNotificationStore } from "@/store/notificationStore";
import usePostStore from "@/store/postStore";
import "@/styles/globals.css";
import { Post } from "@/type";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { posts, addPost } = usePostStore();
  const { notifications, addNotification } = useNotificationStore();
  useEffect(() => {
    const socket = SocketManager.getSocket();
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
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
      socket.off("disconnect");

      socket.close();
    };
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <BottomNavigation />
    </>
  );
}
