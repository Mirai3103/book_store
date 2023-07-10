import React from 'react';
import { Toast } from './toast';

interface NotificationContextProps {
  add: (node: React.ReactNode, key: string) => void;
  remove: (key: string) => void;
  removeAll: () => void;
}

const NotificationContext = React.createContext({} as NotificationContextProps);
interface ToastProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}
const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = React.useState<
    { key: string; node: React.ReactNode }[]
  >([]);
  const add = React.useCallback((node: React.ReactNode, key: string) => {
    setList((prev) => [...prev, { key, node }]);
  }, []);
  const remove = React.useCallback((key: string) => {
    setList((prev) => prev.filter((item) => item.key !== key));
  }, []);
  const removeAll = React.useCallback(() => {
    setList([]);
  }, []);
  const rootRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleEvent = (e: CustomEvent<ToastProps>) => {
      add(<Toast {...e.detail} />, e.detail.message);
      setTimeout(() => {
        remove(e.detail.message);
      }, 5000);
    };
    window.addEventListener('noitfication' as any, handleEvent);
    return () => {
      window.removeEventListener('noitfication' as any, handleEvent);
    };
  }, []);
  return (
    <NotificationContext.Provider
      value={{ add: add, remove: remove, removeAll }}
    >
      {children}
      <div id="Notification-root" ref={rootRef}>
        {list.map((item, index) => (
          <React.Fragment key={index}>{item.node}</React.Fragment>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
