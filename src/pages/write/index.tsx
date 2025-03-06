import { ImageUploadForm } from "@/components/imageUploadForm";

const Index = () => {
  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      await res.json();
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
