import { Bell, HouseIcon, Mail, User } from "lucide-react";

const menus = [
  { icon: <HouseIcon size={20} />, label: "홈" },
  { icon: <Bell size={20} />, label: "알림" },
  { icon: <Mail size={20} />, label: "쪽지" },
  { icon: <User size={20} />, label: "프로필" },
];
export const SideBar = () => {
  return (
    <div className="hidden md:flex w-60 min-h-screen sticky left-0 top-0 border-r border-gray-400 rounded-md">
      <div className="space-y-4">
        {menus.map((item) => (
          <div key={item.label} className="m-4 flex align-center">
            <button className="p-2">{item.icon}</button>
            <span className="text-xl p-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
