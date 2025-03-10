import { Post } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostStore {
  posts: Post[];
  addPost: (post: Post) => void;
  addPosts: (posts: Post[]) => void;
  cursor: string | null;
  setCursor: (newCursor: string | null) => void;
  setPost: (posts: Post[]) => void;
}

const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [],
      cursor: null,
      addPost: (newPost) =>
        set((state) => ({
          posts: [newPost, ...state.posts],
        })),
      addPosts: (newPosts) =>
        set((state) => ({
          posts: [...newPosts, ...state.posts],
        })),
      setCursor: (newCursor) =>
        set({
          cursor: newCursor,
        }),
      setPost: (newPosts) =>
        set({
          posts: [...newPosts].sort((a, b) => b.id - a.id),
        }),
    }),
    {
      name: "post-storage",
    }
  )
);
export default usePostStore;
