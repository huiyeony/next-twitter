import { Post } from "@/type";
import { BarChart, Heart, MessageCircle, Repeat2 } from "lucide-react";
import Image from "next/image";

export const PostItem = ({ id, username, content, createdAt, image }: Post) => {
  return (
    <div
      key={id}
      className="min-w-[400px] min-h-[100px] flex p-3 rounded-xl space-x-4 mb-3"
    >
      <div className="relative rounded-full">
        <Image
          width={50}
          height={50}
          className="rounded-full"
          src={"/user.png"}
          alt={username}
        />
      </div>

      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm text-gray-600">{username}</span>
          <span className="text-sm text-gray-500">
            {createdAt.substring(0, 10)}
          </span>
        </div>

        <p className="font-bold text-sm">{content}</p>
        {image && (
          <div className="relative w-[400px] h-[400px]">
            <Image
              className="mt-4 rounded-xl"
              layout="fill"
              objectFit="contain"
              src={image}
              alt="image"
              priority
            />
          </div>
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
