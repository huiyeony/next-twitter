import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  username: string;
  email: string;
  password: string | undefined;
  createdDt: string;
};
type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  logout: () => void;
};
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
export default useAuthStore;
