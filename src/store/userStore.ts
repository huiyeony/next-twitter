import { Post } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface userStore {
  username: string;
  posts: Post[];
  setUsername: (username: string) => void;
  setPosts: (posts: Post[]) => void;
}
export const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      username: "",
      posts: [],
      setPosts: (newPosts: Post[]) => set({ posts: newPosts }),
      setUsername: (username: string) => set({ username: username }),
    }),
    { name: "user-store" }
  )
);
