import React from "react";
import { useRouter } from "next/router";
import { getMenuItems } from "@/utils/getMenuItem";

const BottomNavigation = () => {
  const router = useRouter();
  const menuItems = getMenuItems(); //선언적인 코드

  return (
    <nav className="fixed bottom-0 min-w-full bg-white border-t border-gray-200 pb-safe z-10">
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
