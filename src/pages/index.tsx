// pages/feed.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Feed.module.css";
import { GetServerSideProps } from "next";
import { getMockPosts } from "@/utils/getMockPosts";
import Image from "next/image";
// interface HomePageProps {
//   posts: Post[];
//   currentPage: number;
//   totalPages: number;
// }
// export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
//   context
// ) => {
//   try {
//     //url 쿼리 파라미터에서 페이지 정보 가져오기
//     const page = context.query.page ? Number(context.query.page) : 1;
//     // 백엔드 API에서 게시글 데이터 가져오기 (fetch 사용)
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/post/?currentPage=${page}&limit=10&category=all&sort=latest`
//     );
//     if (!response.ok) {
//       throw new Error(`${response.status}`);
//     }
//     const data = await response.json();

//     return {
//       props: {
//         posts: data.posts,
//         currentPage: data.currentPage,
//         totalPages: data.totalPages,
//       },
//     };
//   } catch (error) {
//     //오류 발생시 빈 데이터로 반환
//     return {
//       props: {
//         posts: [],
//         currentPage: 1,
//         totalPages: 0,
//       },
//     };
//   }
// };
// TypeScript 인터페이스 정의
interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  category: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
}

interface CategoryFilter {
  id: string;
  name: string;
  japName: string;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");

  // 카테고리 필터 목록
  const categories: CategoryFilter[] = [
    { id: "all", name: "전체", japName: "全て" },
    { id: "general", name: "일반", japName: "一般" },
    { id: "news", name: "뉴스", japName: "ニュース" },
    { id: "culture", name: "문화", japName: "文化" },
    { id: "food", name: "요리", japName: "料理" },
    { id: "travel", name: "여행", japName: "旅行" },
  ];

  useEffect(() => {
    // 게시글 데이터를 가져오는 API 호출을 시뮬레이션
    const fetchPosts = async () => {
      try {
        // 실제 구현에서는 여기에 API 호출이 들어갑니다
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post?currentPage=${currentPage}&limit=10&category=${activeCategory}&sort=${sortOrder}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPosts(data.posts);
        }

        setLoading(false);
      } catch (error) {
        console.error("게시글을 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [activeCategory, sortOrder]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setLoading(true);
  };

  const handleSortChange = (sort: "latest" | "popular") => {
    setSortOrder(sort);
    setLoading(true);
  };
  const putLikes = async (postId: string) => {
    try {
      // 'put' 요청
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(posts.filter((post) => post.id == postId)[0]),
        }
      );
      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  };
  const handleLike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        } else return post;
      })
    );

    putLikes(postId);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>피드</title>
        <meta name="description" content="게시글 피드 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.redCircle}></span>
          <h1>게시글 피드</h1> {/* 게시글 피드 */}
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            홈 {/* 홈 */}
          </Link>
          <Link href="/post/new" className={styles.navLink}>
            새 게시글 {/* 새 게시글 */}
          </Link>
          <Link href="/notifications" className={styles.navLink}>
            알림 {/* 알림 */}
          </Link>
          <Link href="/profile" className={styles.navLink}>
            프로필 {/* 프로필 */}
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.feedHeader}>
          <div className={styles.categoryFilter}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  activeCategory === category.id ? styles.activeCategory : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.sortOptions}>
            <button
              className={`${styles.sortButton} ${
                sortOrder === "latest" ? styles.activeSort : ""
              }`}
              onClick={() => handleSortChange("latest")}
            >
              최신순 {/* 최신순 */}
            </button>
            <button
              className={`${styles.sortButton} ${
                sortOrder === "popular" ? styles.activeSort : ""
              }`}
              onClick={() => handleSortChange("popular")}
            >
              인기순 {/* 인기순 */}
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingCircle}></div>
            <p>로딩 중...</p> {/* 로딩 중... */}
          </div>
        ) : posts.length > 0 ? (
          <div className={styles.feedContent}>
            {posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                {post.image && (
                  <div className={styles.postImageContainer}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.postImage}
                    />
                  </div>
                )}

                <div className={styles.postContent}>
                  <Link
                    href={`/post/${post.id}`}
                    className={styles.postTitleLink}
                  >
                    <h2 className={styles.postTitle}>{post.title}</h2>
                  </Link>

                  <p className={styles.postExcerpt}>{post.content}</p>

                  <div className={styles.postMeta}>
                    <div className={styles.postAuthor}>{}</div>

                    <div className={styles.postInfo}>
                      <span className={styles.postDate}>
                        {formatDate(post.createdAt)}
                      </span>
                      <span className={styles.postCategory}>
                        {categories.find((c) => c.id === post.category)
                          ?.japName || post.category}
                      </span>
                    </div>
                  </div>

                  <div className={styles.postActions}>
                    <button
                      className={`${styles.actionButton} ${
                        post.isLiked ? styles.likedButton : ""
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.isLiked ? "❤️" : "♡"} <span>{post.likes}</span>
                    </button>

                    <button className={styles.actionButton}>
                      💬 <span>{post.comments}</span>
                    </button>

                    <button className={styles.actionButton}>🔖</button>

                    <button className={styles.actionButton}>🔗</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>게시글이 없습니다</p> {/* 게시글이 없습니다 */}
          </div>
        )}

        <div className={styles.pagination}>
          <button className={styles.pageButton} disabled>
            이전
          </button>{" "}
          {/* 이전 */}
          <div className={styles.pageNumbers}>
            <button
              className={`${styles.pageNumberButton} ${styles.activePage}`}
            >
              1
            </button>
            <button className={styles.pageNumberButton}>2</button>
            <button className={styles.pageNumberButton}>3</button>
            <span className={styles.pageEllipsis}>...</span>
            <button className={styles.pageNumberButton}>10</button>
          </div>
          <button className={styles.pageButton}>다음</button> {/* 다음 */}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
