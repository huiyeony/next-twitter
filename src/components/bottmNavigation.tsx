import React from "react";
import { useRouter } from "next/router";
import { Home, User, Bell, Pencil } from "lucide-react";
import useAuthStore from "@/store/authStore";

const BottomNavigation = () => {
  const router = useRouter();
  const { user } = useAuthStore();
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
      path: `/profile/${user?.username}`,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full
              ${
                router.pathname === item.path
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
