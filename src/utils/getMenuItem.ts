import useAuthStore from "@/store/authStore";
import { Home, User, Bell, Pencil } from "lucide-react";

export const getMenuItems = () => {
  const menuItems = [
    {
      id: 1,
      icon: Home,
      label: "홈",
      path: "/",
    },
    {
      id: 2,
      icon: Pencil,
      label: "글쓰기",
      path: "/write",
    },
    {
      id: 3,
      icon: Bell,
      label: "알림",
      path: "/notifications",
    },
    {
      id: 4,
      icon: User,
      label: "프로필",
      path: `/profile`,
    },
  ];
  return menuItems;
};
