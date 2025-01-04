import ModalInput from "@/components/modalInput";
import { PostItem } from "@/components/postItem";
import { usePostsWithSocket } from "@/hooks/usePostsWithSocket";
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";
import { Bell, Mail, User, HouseIcon, Plus } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, openModal, closeModal } = useModalStore();
  const { createPost, loadPosts, posts, ref } = usePostsWithSocket();
  const { user } = useAuthStore();
  const [showScrollTop, setShowScrollTop] = useState(true);

  const router = useRouter();
  const checkLoginAndRedirect = () => {
    if (!user) {
      return false;
    }
    return true;
  };
  const handleSubmit = (value: string) => {
    //로그인 여부 확인
    if (!checkLoginAndRedirect()) {
      alert(`로그인이 필요한 서비스입니다.`);
      router.push("/login");
      return;
    }
    //사용자 이름 기억
    const post = { username: `${user?.username}`, content: value };
    createPost(post);

    closeModal();
  };
  const handleModalOpen = () => {
    console.log(`모달 버튼 클릭 `);
    if (isOpen) closeModal();
    else openModal();
  };

  useEffect(() => {
    //마운트

    //언마운트
    return () => {};
  }, []);

  useEffect(() => {
    //버튼 보이기
    //todo : 새 트윗이 추가 되도 버튼 보이도록 수정
    const handleScroll = () => setShowScrollTop(true);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menus = [
    { icon: <HouseIcon size={20} />, label: "홈" },
    { icon: <Bell size={20} />, label: "알림" },
    { icon: <Mail size={20} />, label: "쪽지" },
    { icon: <User size={20} />, label: "프로필" },
  ];

  return (
    <>
      <Head>
        <title> Twitter </title>
        <meta name="description" content="소셜 커뮤니티" />
      </Head>
      <main>
        <div className="min-h-screen">
          <div className="flex max-x-7xl mx-auto">
            {/**side bar */}
            <div className="w-60 min-h-screen sticky left-0 top-0 border-r border-gray-400 rounded-full">
              <div className="space-y-4">
                {menus.map((item) => (
                  <div key={item.label} className="m-4 flex align-center">
                    <button className="p-2">{item.icon}</button>
                    <span className="text-xl p-2">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/** posts */}
            <div className="flex flex-col">
              {posts.map((item) => (
                <PostItem key={item.id} {...item} />
              ))}
              <div ref={ref}></div>
              <button
                onClick={handleModalOpen}
                className="fixed bottom-8 right-16 w-20 h-20 flex items-center justify-center 
              w-14 h-14 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
              >
                <Plus size={20} />
              </button>
              {/**모달  */}
              {isOpen && <ModalInput handleSubmit={handleSubmit} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
