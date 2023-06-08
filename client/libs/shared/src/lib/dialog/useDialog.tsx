import { DialogContext } from './DialogContext';
import React from 'react';
import ConfirmDialog, { IConfirmDialogProps } from './Dialog';
import { randomUniqueString } from '../Utils';

export default function useDialog() {
  const { add, remove } = React.useContext(DialogContext);
  const createConfirmDialog = React.useCallback(
    ({ onConfirm, onCancel, ...props }: IConfirmDialogProps) => {
      const key = randomUniqueString();
      const onClose = () => {
        onCancel();
        remove(key);
      };
      const onOk = () => {
        onConfirm();
        remove(key);
      };
      add(
        <ConfirmDialog {...props} onCancel={onClose} onConfirm={onOk} />,
        key
      );
    },
    [add, remove]
  );
  return {
    createConfirmDialog,
  };
}
