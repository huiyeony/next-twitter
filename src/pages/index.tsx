import BottomNavigation from "@/components/bottmNavigation";
import { InfiniteScroll } from "@/components/infiniteScroll";
import ModalInput from "@/components/modalInput";
import { PostItem } from "@/components/postItem";
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";
import usePostStore from "@/store/postStore";
import { Bell, Mail, User, HouseIcon, Plus } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const { posts } = usePostStore();

  return (
    <>
      <main>
        <div className="min-h-screen">
          <div className="flex max-x-7xl mx-auto">
            <div className="hidden">
              <InfiniteScroll />
            </div>

            {/** posts */}
            <div className="mb-32 flex flex-col sm:mt-4 md:mt-14">
              {posts.map((item) => (
                <PostItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
