/* eslint-disable @next/next/no-img-element */
import { PostItem } from "@/components/postItem";
import { useUserStore } from "@/store/userStore";
import { ExternalLink, HeartIcon, MessageCircle } from "lucide-react";

const Index = () => {
  const { username, posts } = useUserStore();
  const activities = [
    {
      id: 1,
      title: "title",
      content: `수원 행궁동 츄플러스에 다녀 왔어요!!`,
      likes: 100,
      comments: 100,
      date: new Date().toString().substring(0, 10),
    },
  ];
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/**유저 프로필  */}

      <div
        className="flex flex-col md:flex-row bg-white rounded-lg border-2 
      p-6 mb-6"
      >
        <div className="flex-shrink-0 w-32 h-32 mx-auto md:mx-0 md:mr-8 mb-4 md:mb-0">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={"/user.png"}
              alt="프로필 사진"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h1 className="text-2xl font-bold">{`name`}</h1>
          <p className="text-gray-500 mb-3">@{`username`}</p>
          <p className="text-gray-700 mb-4 leading-relaxed">{`bio`}</p>

          <div className="flex mb-4">
            <div className="mr-6">
              <span className="block font-bold text-lg">{`stats.posts`}</span>
              <span className="text-gray-500 text-sm">게시물</span>
            </div>
            <div className="mr-6">
              <span className="block font-bold text-lg">
                {`stats.followers.toLocaleString()`}
              </span>
              <span className="text-gray-500 text-sm">팔로워</span>
            </div>
            <div>
              <span className="block font-bold text-lg">
                {`stats.following.toLocaleString()`}
              </span>
              <span className="text-gray-500 text-sm">팔로잉</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
              팔로우
            </button>
            <button className="px-4 py-2 bg-white text-blue-500 font-semibold border border-blue-500 rounded-full hover:bg-blue-50 transition-colors">
              메시지
            </button>
          </div>
        </div>
      </div>

      {/* 최근 활동 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold pb-3 border-b border-gray-100 mb-4">
          최근 활동
        </h2>

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="py-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{activity.title}</h3>
              <span className="text-gray-500 text-sm">{activity.date}</span>
            </div>
            <p className="text-gray-700 mb-3 leading-relaxed">
              {activity.content}
            </p>
            <div className="flex space-x-6">
              <div className="flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
                <HeartIcon />
                <span className="ml-1 text-sm">{activity.likes}</span>
              </div>
              <div className="flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
                <MessageCircle />
                <span className="ml-1 text-sm">{activity.comments}</span>
              </div>
              <div className="flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
                <ExternalLink />
                <span className="ml-1 text-sm">공유</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;
