import usePostStore from "@/store/postStore";
import { Post } from "@/type";
import { Bell, Camera, Laugh, Search } from "lucide-react";
import { GetServerSideProps } from "next";
interface BoardPageProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
}
export const getServerSideProps: GetServerSideProps<BoardPageProps> = async (
  context
) => {
  try {
    //url 쿼리 파라미터에서 페이지 정보 가져오기
    const page = context.query.page ? Number(context.query.page) : 1;
    // 백엔드 API에서 게시글 데이터 가져오기 (fetch 사용)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/?page=${page}&limit=10`
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return {
      props: {
        posts: data.posts,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      },
    };
  } catch (error) {
    //오류 발생시 빈 데이터로 반환
    return {
      props: {
        posts: [],
        currentPage: 1,
        totalPages: 0,
      },
    };
  }
};
export default function Home({
  posts,
  totalPages,
  currentPage,
}: BoardPageProps) {
  const { setPost } = usePostStore();
  //로컬 스토리지에 저장
  //setPost(posts);
  const handleLike = (id: number) => {
    // setPost(
    //   posts.map((post) =>
    //     post.id === id
    //       ? {
    //           ...post,
    //           likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    //           isLiked: !post.isLiked,
    //         }
    //       : post
    //   )
    // );
  };

  const handleBookmark = (id: number) => {
    // setPost(
    //   posts.map((post) =>
    //     post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post
    //   )
    // );
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow fixed w-full z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-500">SocialApp</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <Search />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <Bell />
              </button>
              <img
                src="/user.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto pt-16 pb-20 px-4 bg-white min-h-screen">
          {/* Create Post */}
          <div className="mb-4 p-4 border-b">
            <div className="flex">
              <img
                src="/user.png"
                alt="프로필사진"
                className="w-10 h-10 rounded-full mr-3"
              />
              <input
                type="text"
                placeholder="무슨 일이 일어나고 있나요?"
                className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between mt-3 pl-12">
              <div className="flex space-x-4">
                <button className="text-blue-500 flex items-center space-x-1">
                  <Camera size={24} />
                  <span className="text-sm">사진</span>
                </button>
                <button className="text-blue-500 flex items-center space-x-1">
                  <Laugh size={24} />
                  <span className="text-sm">이모티콘</span>
                </button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                게시
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="border-b py-4">
              {/* Post Header */}
              <div className="flex justify-between">
                <div className="flex">
                  <img
                    src={"/user.png"}
                    alt={`username`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-semibold">{post.username}</span>
                      <span className="text-gray-500 text-sm ml-2">{`post.userHandle`}</span>
                      <span className="text-gray-500 mx-1">·</span>
                      <span className="text-gray-500 text-sm">{`post.timestamp`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mt-2 mb-3 pl-12">
                <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
                {post.image && (
                  <div className="mt-3 rounded-xl overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex pl-8 text-gray-500">
                <button
                  className="flex items-center group"
                  onClick={() => handleLike(post.id)}
                >
                  <div
                    className={`p-2 rounded-full group-hover:bg-red-50 ${
                      post.isLiked ? "text-red-500" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={post.isLiked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-xs ${post.isLiked ? "text-red-500" : ""}`}
                  >{`post.likes`}</span>
                </button>

                <button className="flex items-center group">
                  <div className="p-2 rounded-full group-hover:bg-blue-50">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs">{`post.comments`}</span>
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
