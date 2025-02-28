import { NotificationItem } from "@/components/notificationItem";
import { useNotificationStore } from "@/store/notificationStore";
import { NotificationDto } from "@/type";

const Index = () => {
  const { removeNotification } = useNotificationStore();
  const notification = {
    id: "1",
    title: "컬리",
    message: "고객님,보유하신 10,000원 쿠폰이 곧 만료될 예정입니다...",
    icon: "/user.png",
    time: new Date().toString().substring(0, 10), //yyyy-mm-dd
  };
  const handleOnDismiss = (id: string) => {
    //zustand 로 리팩토링
    removeNotification(id);
  };
  return (
    <div className="flex flex-col px-5 mt-10 items-center space-y-5">
      <NotificationItem
        notification={notification}
        onDismiss={handleOnDismiss}
      />
      <NotificationItem
        notification={notification}
        onDismiss={handleOnDismiss}
      />
    </div>
  );
};
export default Index;
