// pages/notifications.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Notification.module.css";

// TypeScript 인터페이스 정의
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: "info" | "warning" | "success" | "error";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 알림 데이터를 가져오는 API 호출을 시뮬레이션
    const fetchNotifications = async () => {
      try {
        // 실제 구현에서는 여기에 API 호출이 들어갑니다
        // const response = await fetch('/api/notifications');
        // const data = await response.json();

        // 예시 데이터
        const mockData: Notification[] = [
          {
            id: "1",
            title: "새로운 매시지",
            message: "타나카 씨로부터 메시지가 도착했습니다。",
            date: "2025-04-10T09:15:00",
            isRead: false,
            type: "info",
          },
          {
            id: "2",
            title: "계정확인",
            message: "이메일 주소 확인이 완료되었습니다。감사합니다!",
            date: "2025-04-09T14:30:00",
            isRead: true,
            type: "success",
          },
          {
            id: "3",
            title: "시스템 유지보수",
            message: "내일 오전 3시부터 6시까지 시스템 유지보수 예정。",
            date: "2025-04-08T18:45:00",
            isRead: true,
            type: "warning",
          },
          {
            id: "4",
            title: "비밀번호 변경",
            message: "계정 비밀번호가 변경되었습니다。",
            date: "2025-04-07T11:20:00",
            isRead: false,
            type: "error",
          },
          {
            id: "5",
            title: "게시물이 승인됨",
            message: "귀하의 게시물이 승인 되었습니다。",
            date: "2025-04-06T16:10:00",
            isRead: true,
            type: "success",
          },
        ];

        setNotifications(mockData);
        setLoading(false);
      } catch (error) {
        console.error("알림을 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    // 실제 구현에서는 API 호출이 들어갑니다
    // await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
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

  const getNotificationIcon = (type: Notification["type"]): string => {
    switch (type) {
      case "info":
        return "📢";
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "🔔";
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>알림</title>
        <meta name="description" content="알림 페이지。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.redCircle}></span>
          <h1>알림 센터。</h1> {/* 알림 센터 */}
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            홈。 {/* 홈 */}
          </Link>
          <Link href="/profile" className={styles.navLink}>
            프로필。 {/* 프로필 */}
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.notificationHeader}>
          <h2>알림。</h2> {/* 알림 */}
          <button className={styles.readAllButton}>
            모두 읽음 표시 {/* 모두 읽음 표시 */}
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingCircle}></div>
            <p>로딩중...</p> {/* 로딩 중... */}
          </div>
        ) : notifications.length > 0 ? (
          <ul className={styles.notificationList}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`${styles.notificationItem} ${
                  notification.isRead ? styles.read : styles.unread
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={styles.notificationIcon}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className={styles.notificationContent}>
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <div className={styles.notificationMeta}>
                    <span className={styles.date}>
                      {formatDate(notification.date)}
                    </span>
                    {!notification.isRead && (
                      <span className={styles.unreadBadge}>읽지 않음</span> // 읽지 않음
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>알림이 없습니다。</p> {/* 알림이 없습니다 */}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p></p>
      </footer>
    </div>
  );
}
