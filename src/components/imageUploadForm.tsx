import useAuthStore from "@/store/authStore";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type TImageUploadFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
};
export const ImageUploadForm = ({ onSubmit }: TImageUploadFormProps) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      //todo 이미지 미리보기 URL 생성
    }
  };
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    if (!user) {
      alert(`로그인이 필요한 서비스입니다.`);
      router.push("/login");
      return;
    }
    const formData = new FormData();
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    formData.append("username", user?.username.toString());
    formData.append("content", content.toString());
    try {
      await onSubmit(formData);
    } catch (error) {
      console.log(`\${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleOnSubmit} className="space-y-4 max-w-md ">
        <input
          value={content}
          name="content"
          placeholder="무슨일이 일어나고 있나요??"
          onChange={(e) => setContent(e.target.value)}
          className="text-sm mt-1 block w-full rounded-md border-2 border-gray-300"
          required
        />
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm mt-1 block w-full"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`
          w-full px-4 py-2 rounded-md
          ${isLoading ? "bg-gray-400" : "text-sm bg-gray-300 hover:bg-gray-400"}
        `}
        >
          {isLoading ? "업로드 중..." : "게시글 작성"}
        </button>
      </form>
    </>
  );
};
