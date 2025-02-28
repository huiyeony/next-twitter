import { ImageUploadForm } from "@/components/imageUploadForm";
import SocketManager from "@/libs/socket";
const Index = () => {
  const onSubmit = async (formData: FormData) => {
    // /api/post.ts
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      //todo 성공 후 소켓 emit
      const socket = SocketManager.getSocket();
      socket.emit("newPost", data);

      return data;
      //todo 성공 후 리다이렉트
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-bold text-md">새글 작성</h1>
        <div className="mt-10"></div>
        <ImageUploadForm onSubmit={onSubmit} />
      </div>
    </>
  );
};
export default Index;
