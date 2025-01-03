import { Post } from "@/type";
import { BarChart, Heart, MessageCircle, Repeat2 } from "lucide-react";
import Image from "next/image";

export const PostItem = ({
  id,
  username,
  avatar,
  content,
  createdAt,
  image,
}: Post) => {
  return (
    <div key={id} className="flex space-x-4 m-8">
      <div className="w-10 h-10 rounded-full bg-gray-300">
        <Image
          width={30}
          height={30}
          className="rounded-full"
          src={avatar || "http://placehold.co/60x60/png"}
          alt={username}
        />
      </div>

      <div className="flex-grow space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-xl">{username}</span>
          <span className="text-gray-400 text-sm">{createdAt}</span>
        </div>

        <p className="text-sm">{content}</p>
        {image && (
          <Image
            className="mt-4 rounded-xl"
            width={160}
            height={160}
            src={image || "http://placehold.co/160x160/png"}
            alt="Tweet Image"
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
