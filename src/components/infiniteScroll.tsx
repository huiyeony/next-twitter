import usePostStore from "@/store/postStore";
import { Post } from "@/type";
import { ArrowBigUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { addPosts, setPost } = usePostStore();
  const [latestId, setLatestId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const { ref, inView } = useInView();

  const fetchNewerPosts = async () => {
    try {
      if (isPending) return;
      if (!hasMore) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/newer?latestId=${latestId}&limit=20`
      );
      if (!res.ok) {
        throw new Error(`최근 데이터를 불러오는데 실패했습니다`);
      }
      const data = await res.json();

      if (data.length == 0) {
        setHasMore(false);
        return;
      }

      // 새로운 포스트 추가
      addPosts(data);
      setLatestId(data[0]?.id);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchInitialPosts = async () => {
    try {
      setIsPending(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/initial?limit=20`
      );
      if (!res.ok) {
        throw new Error(`최신 데이터를 불러오는데 실패했습니다`);
      }
      const data = await res.json();
      //포스트 리스트
      setPost(data);
      setLatestId(data[0]?.id || null);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (inView && hasMore && !isPending) fetchNewerPosts();
  }, [inView]);
  useEffect(() => {
    fetchInitialPosts();
  }, []);
  return (
    <>
      <div className="flex align-center justify-center" ref={ref}>
        {
          <button
            onClick={handleScrollToTop}
            className="fixed top-2 mt-4 w-14 h-14 flex items-center justify-center 
              bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
          >
            <ArrowBigUpIcon size={14} />
          </button>
        }
      </div>
    </>
  );
};
