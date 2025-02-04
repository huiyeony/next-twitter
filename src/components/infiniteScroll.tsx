import usePostStore from "@/store/postStore";
import { Post } from "@/type";
import { ArrowBigDownIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const InfiniteScroll = () => {
  const { addPosts, setPost } = usePostStore();
  const [latestId, setLatestId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { ref, inView } = useInView();

  //최신 데이터를 받아오는 함수
  const getInitialPosts = useCallback(async () => {
    try {
      setIsPending(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/initial`
      );
      if (!res.ok) {
        throw new Error(`최신 데이터를 불러오는데 실패했습니다`);
      }
      const data: Post[] = await res.json();

      //포스트 리스트
      setPost(data);
      const len = data.length;
      if (len > 0) setLatestId(data[0]?.id);
      console.log(data[0]?.id);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  }, [setPost]);
  //useEffect 함수 내부에서는 await xxx
  useEffect(() => {
    getInitialPosts();
  }, []);

  return (
    <>
      <div className="flex align-center justify-center">
        {
          <button
            className="w-20 h-20 flex align-center justify-center"
            ref={ref}
          >
            <ArrowBigDownIcon size={20} />
          </button>
        }
      </div>
    </>
  );
};
