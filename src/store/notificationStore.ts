import { NotificationDto } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationStore {
  notifications: NotificationDto[];
  //새 알림 추가
  addNotification: (notification: NotificationDto) => void;
  removeNotification: (id: string) => void;
  clearNotification: () => void;
}
export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: { notification, ...state.notifications },
        })),
      removeNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        })),
      clearNotification: () =>
        set({
          notifications: [],
        }),
    }),
    { name: "notification-store" }
  )
);
