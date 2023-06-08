import React from 'react';

interface NotificationContextProps {
  add: (node: React.ReactNode, key: string) => void;
  remove: (key: string) => void;
  removeAll: () => void;
}

const NotificationContext = React.createContext({} as NotificationContextProps);

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
