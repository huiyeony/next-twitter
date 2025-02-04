import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";
import { useRouter } from "next/router";
import { useState } from "react";

const ModalInput = ({
  handleSubmit,
}: {
  handleSubmit: (value: string) => void;
}) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModalStore();
  const [inputValue, setInputValue] = useState<string>("");

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      {/**  모달 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex flex-col items-center justify-center">
          <div className="px-6 bg-white rounded-xl w-11/12 max-w-md p-1 shadow-xl">
            {/**입력창 */}
            <textarea
              rows={7}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="무슨일이 일어나고 있나요?"
              className="min-h-28 w-full border border-gray-300 rounded-xl px-3 py-2 mt-4"
            />

            {/**버튼 그룹 */}
            <div className="m-3 flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded border text-black hover:bg-gray-100 transition-colors"
              >
                취소
              </button>
              <button
                disabled={inputValue.length === 0}
                onClick={() => handleSubmit(inputValue)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalInput;
