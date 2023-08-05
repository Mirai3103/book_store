import { NotificationContext } from './notificationContext';
import React from 'react';
import { Toast } from './toast';
import { randomUniqueString } from '../Utils';
interface INotificationProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
export function useNotification() {
  const { add, remove } = React.useContext(NotificationContext);
  const show = React.useCallback(
    ({ type, message, duration = 3000 }: INotificationProps) => {
      const key = randomUniqueString();
      const onClose = () => {
        remove(key);
      };
      if (duration > 0) {
        setTimeout(() => {
          onClose();
        }, duration);
      }

      add(<Toast message={message} type={type} onClose={onClose} />, key);
    },
    [add, remove]
  );
  return {
    show,
  };
}
