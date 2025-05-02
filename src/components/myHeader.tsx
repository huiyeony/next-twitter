import styles from "@/styles/Feed.module.css";
import Link from "next/link";
export const MyHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={styles.h1}>대나무 숲</h1> {/* 게시글 피드 */}
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          홈 {/* 홈 */}
        </Link>
        <Link href="/write" className={styles.navLink}>
          새 게시글 {/* 새 게시글 */}
        </Link>
        <Link href="/notifications" className={styles.navLink}>
          알림 {/* 알림 */}
        </Link>
        <Link href="/profile" className={styles.navLink}>
          프로필 {/* 프로필 */}
        </Link>
        <Link href="/register" className={styles.navLink}>
          회원가입
        </Link>
        <Link href="/login" className={styles.navLink}>
          로그인
        </Link>
      </nav>
    </header>
  );
};
