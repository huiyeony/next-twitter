import usePostStore from "@/store/postStore";
import { Post } from "@/type";
import { ArrowBigUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { addPosts, setPost } = usePostStore();
  const [latestId, setLatestId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();
  const fetchNewerPosts = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);
  return (
    <>
      <div className="flex align-center justify-center" ref={ref}>
        {hasMore && (
          <button
            className="mt-4 w-20 h-20 flex items-center justify-center 
              w-14 h-14 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
          >
            <ArrowBigUpIcon size={20} />
          </button>
        )}
      </div>
    </>
  );
};
