export type UploadForm = {
  title: string;
  category: "general";
  content: string;
  author: string;
  image: File | null;
};

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

export type CreatePostDto = {
  username: string;
  content: string;
};
export interface Post {
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

export interface LoginRequest {
  email: string;
  password: string;
}
