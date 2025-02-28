import { PostItem } from "@/components/postItem";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

const Index = () => {
  const { username, posts } = useUserStore();
  const dummyPosts = [
    {
      id: 1,
      username: "홍김동전",
      content: "안녕하세요 홍김동전 입니다.",
      image: "/file.svg",
      createdAt: new Date().toString().substring(0, 10),
    },
  ];
  return (
    <div className="bg-gray-100 w-full h-screen flex flex-col p-8 space-y-9">
      {/**유저 프로필  */}
      <div className="flex items-center">
        <div className="">
          <Image src={"/user.png"} alt={username} width={60} height={60} />
        </div>
        <div className="font-bold text-sm px-3">홍김동전</div>
      </div>
      {/**그리드 배치 */}
      <div className="w-full ml-3 grid md:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        {dummyPosts.map((item) => (
          <div
            key={item.id}
            className="transition-transform duration-300 bg-white shadow-md rounded-md 
            hover:-translate-y-2 hover:shadow-md"
          >
            <PostItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Index;
