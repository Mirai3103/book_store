import React from "react";

interface DialogContextProps {
    add: (node: React.ReactNode, key: string) => void;
    remove: (key: string) => void;
    removeAll: () => void;
}

const DialogContext = React.createContext({} as DialogContextProps);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [list, setList] = React.useState<{ key: string; node: React.ReactNode }[]>([]);
    const add = React.useCallback((node: React.ReactNode, key: string) => {
        setList((prev) => [...prev, { key, node }]);
    }, []);
    const remove = React.useCallback((key: string) => {
        setList((prev) => prev.filter((item) => item.key !== key));
    }, []);
    const removeAll = React.useCallback(() => {
        setList([]);
    }, []);
    return (
        <DialogContext.Provider value={{ add: add, remove: remove, removeAll }}>
            {children}
            <div id="dialog-root">
                {list.map((item, index) => (
                    <React.Fragment key={index}>{item.node}</React.Fragment>
                ))}
            </div>
        </DialogContext.Provider>
    );
};

export { DialogContext, DialogProvider };
