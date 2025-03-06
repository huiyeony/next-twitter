export type NotificationItemProps = {
  notification: NotificationDto;
  onDismiss: (id: string) => void;
};
export type NotificationDto = {
  id: string;
  icon: string;
  time: string;
  title: string;
  message: string;
};

export type UpdatePostDto = {
  id: number;
  content: string;
};
export type CreatePostDto = {
  username: string;
  content: string;
};
export type Post = {
  id: number;
  username: string;
  createdAt: string;
  content: string;
  image: string | null;
  isLiked: boolean;
  likes: number;
  isBookmarked: boolean;
};

export type Room = {
  id: number;
  thumbnail?: string;
  title?: string;
  lastUpdated?: string;
  lastMessage?: string;
  unread?: number;
};
export interface User {
  email: string;
  username: string;
  password: string | undefined;
}
export interface FormError {
  email: string;
  password: string;
  submit: string;
}
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  user: User;
}

export interface AxiosError {
  message: string;
  status: number | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
}
