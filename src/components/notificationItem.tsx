import { NotificationItemProps } from "@/type";
import { X } from "lucide-react";
import Image from "next/image";
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDismiss,
}) => {
  return (
    <div className="bg-gray-200 opacity-50 rounded-lg flex space-x-4 p-3 pb-5  ">
      <div className="w-10 h-10 rounded-full font-bold flex items-center">
        <Image
          width={20}
          height={20}
          className="rounded-full"
          src={"/user.png"}
          alt={notification.title}
        />
      </div>

      <div className="flex flex-col text-sm font-bold">
        <span>
          {notification.title} {notification.time}
        </span>
        <span>{notification.message}</span>
      </div>
      <div>
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
