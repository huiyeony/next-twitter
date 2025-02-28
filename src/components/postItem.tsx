import { Post } from "@/type";
import { BarChart, Heart, MessageCircle, Repeat2 } from "lucide-react";
import Image from "next/image";

export const PostItem = ({ id, username, content, createdAt, image }: Post) => {
  return (
    <div key={id} className="flex space-x-4 m-8">
      <div className="relative w-10 h-10 rounded-full bg-white ">
        <Image fill className="rounded-full" src={"/user.png"} alt={username} />
      </div>

      <div className="flex-grow space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm text-gray-600">{username}</span>
          <span className="text-sm text-gray-500">
            {createdAt.substring(0, 10)}
          </span>
        </div>

        <p className="font-bold text-sm">{content}</p>
        {image && (
          <Image
            className="object-contain max-w-[200] max-h-[500px] mt-4 rounded-xl"
            width={200}
            height={500}
            src={image}
            alt="image"
            priority
          />
        )}
        <div className="flex justify-between mt-4 text-gray-500">
          <button className="hover:text-blue-500 flex space-x-3 justify-center">
            <BarChart size={18} />
            <span className="text-sm"> </span>
          </button>
          <button className="hover:text-blue-500 flex space-x-3">
            <Heart size={18} />
            <span className="text-sm"></span>
          </button>
          <button className="hover:text-blue-500 flex space-x-3">
            <MessageCircle size={18} />
            <span className="text-sm"></span>
          </button>
          <button className="hover:text-blue-500 flex space-x-3">
            <Repeat2 size={18} />
            <span className="text-sm"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
