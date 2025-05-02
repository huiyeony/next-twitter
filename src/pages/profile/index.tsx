// pages/profile.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Profile.module.css";

// TypeScript 인터페이스 정의
interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    instagram: string;
    github: string;
  };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

interface ProfileFormData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  instagram: string;
  github: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    instagram: "",
    github: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  useEffect(() => {
    // 프로필 데이터를 가져오는 API 호출을 시뮬레이션
    const fetchProfile = async () => {
      try {
        // 실제 구현에서는 여기에 API 호출이 들어갑니다
        // const response = await fetch('/api/profile');
        // const data = await response.json();

        // 예시 데이터
        const mockData: UserProfile = {
          id: "123456",
          username: "sakura_tanaka",
          displayName: "@sakura_tanaka",
          email: "sakura@example.jp",
          bio: "안녕하세요 기술 블로그 운영중인 주니어 개발자입니다!。",
          avatar: "image/user.png", // 실제로는 이미지 URL
          joinDate: "2023-05-15T00:00:00",
          location: "서울, 한국",
          website: "https://sakuradesign.jp",
          socialLinks: {
            twitter: "@sakura_design",
            instagram: "sakura.design",
            github: "sakura-tanaka",
          },
          stats: {
            posts: 42,
            followers: 189,
            following: 76,
          },
        };

        setProfile(mockData);
        setFormData({
          displayName: mockData.displayName,
          bio: mockData.bio,
          location: mockData.location,
          website: mockData.website,
          twitter: mockData.socialLinks.twitter,
          instagram: mockData.socialLinks.instagram,
          github: mockData.socialLinks.github,
        });
        setAvatarPreview(mockData.avatar);
        setLoading(false);
      } catch (error) {
        console.error("프로필을 가져오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatar(file);

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 실제 구현에서는 API 호출을 통해 프로필을 업데이트합니다
    // const formDataToSend = new FormData();
    // formDataToSend.append('displayName', formData.displayName);
    // ... other fields
    // if (newAvatar) formDataToSend.append('avatar', newAvatar);

    // await fetch('/api/profile', {
    //   method: 'PUT',
    //   body: formDataToSend
    // });

    // 업데이트된 프로필 정보를 상태에 반영
    if (profile) {
      const updatedProfile: UserProfile = {
        ...profile,
        displayName: formData.displayName,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        socialLinks: {
          twitter: formData.twitter,
          instagram: formData.instagram,
          github: formData.github,
        },
      };

      if (newAvatar) {
        // 실제로는 업로드 후 받은 URL을 사용해야 합니다
        updatedProfile.avatar = avatarPreview;
      }

      setProfile(updatedProfile);
    }

    setIsEditing(false);
    alert("프로필이 업데이트되었습니다!"); // 프로필이 업데이트되었습니다!
  };

  const formatJoinDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingCircle}></div>
          <p>読み込み中...</p> {/* 로딩 중... */}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>프로필</title>
        <meta name="description" content="프로필 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {profile && (
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                {isEditing ? (
                  <label className={styles.avatarEditLabel}>
                    <img
                      src={avatarPreview || "/images/default-avatar.jpg"}
                      alt="아바타 프리뷰"
                      className={styles.avatar}
                    />
                    <div className={styles.avatarOverlay}>
                      <span>변경</span> {/* 변경 */}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className={styles.avatarInput}
                    />
                  </label>
                ) : (
                  <img
                    src={profile.avatar || "/images/default-avatar.jpg"}
                    alt="아바타 이미지"
                    className={styles.avatar}
                  />
                )}
              </div>

              <div className={styles.profileInfo}>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className={styles.nameInput}
                    placeholder="프로필정보"
                  />
                ) : (
                  <h2 className={styles.displayName}>{profile.displayName}</h2>
                )}
                <p className={styles.username}>@{profile.username}</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>
                      {profile.stats.posts}
                    </span>
                    <span className={styles.statLabel}>게시글</span>{" "}
                    {/* 게시글 */}
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>
                      {profile.stats.followers}
                    </span>
                    <span className={styles.statLabel}>팔로워</span>{" "}
                    {/* 팔로워 */}
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>
                      {profile.stats.following}
                    </span>
                    <span className={styles.statLabel}>팔로잉</span>{" "}
                    {/* 팔로잉 */}
                  </div>
                </div>
              </div>

              {!isEditing && (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  편집 {/* 편집 */}
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="bio">자기소개</label> {/* 자기소개 */}
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="안녕하세요~"
                    rows={4}
                  ></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location">위치</label> {/* 위치 */}
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="위치"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="website">웹사이트</label> {/* 웹사이트 */}
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="https://example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>SNS 계정</label> {/* SNS 계정 */}
                  <div className={styles.socialInput}>
                    <span className={styles.socialIcon}>🐦</span>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="@username"
                    />
                  </div>
                  <div className={styles.socialInput}>
                    <span className={styles.socialIcon}>📸</span>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="username"
                    />
                  </div>
                  <div className={styles.socialInput}>
                    <span className={styles.socialIcon}>💻</span>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="username"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setIsEditing(false)}
                  >
                    취소 {/* 취소 */}
                  </button>
                  <button type="submit" className={styles.saveButton}>
                    저장 {/* 저장 */}
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.profileDetails}>
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>자기 소개</h3>{" "}
                  {/* 자기소개 */}
                  <p className={styles.bio}>{profile.bio}</p>
                </div>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>정보</h3> {/* 정보 */}
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <span>{profile.location}</span>
                  </div>
                  {profile.website && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>🌐</span>
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {profile.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📅</span>
                    <span>{formatJoinDate(profile.joinDate)}에 가입</span>{" "}
                    {/* ~에 가입 */}
                  </div>
                </div>

                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>SNS</h3>
                  {profile.socialLinks.twitter && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>🐦</span>
                      <span>{profile.socialLinks.twitter}</span>
                    </div>
                  )}
                  {profile.socialLinks.instagram && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>📸</span>
                      <span>{profile.socialLinks.instagram}</span>
                    </div>
                  )}
                  {profile.socialLinks.github && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>💻</span>
                      <span>{profile.socialLinks.github}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
