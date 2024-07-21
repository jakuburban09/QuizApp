import React, {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  useEffect,
} from "react";

import { Color } from "helpers/enums";
import Notification from "./bricks/Notification";

type NotificationType = {
  id: number;
  heading: string;
  text: string | unknown;
  backgroundColor?: Color;
  type?: "success" | "warning" | "error" | "info";
};

type NotificationContextType = {
  notifications: NotificationType[];
  addNotification: (
    heading: string,
    text: string | unknown,
    backgroundColor?: Color,
    type?: "success" | "warning" | "error" | "info",
  ) => void;
  removeNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

let notificationId = 0;

export const NotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (
    heading: string,
    text: string | unknown,
    backgroundColor?: Color,
    type?: "success" | "warning" | "error" | "info",
  ) => {
    setNotifications([
      ...notifications,
      { id: notificationId++, heading, text, backgroundColor, type },
    ]);
  };

  const removeNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      <div className="fixed top-0 z-50 mt-4 space-y-2 w-full px-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-enter">
            <Notification
              heading={notification.heading}
              text={notification.text}
              backgroundColor={notification.backgroundColor}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
              onDetail={() =>
                console.log("Show notification detail for", notification.id)
              }
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
