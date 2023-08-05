import React from 'react';

export interface IConfirmDialogProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog(props: IConfirmDialogProps) {
  const randomId = React.useMemo(() => Math.random().toString(16).slice(2), []);
  React.useEffect(() => {
    const input = document.getElementById(randomId) as HTMLInputElement;
    input.checked = true;
  }, [randomId]);
  return (
    <div>
      <input type="checkbox" id={randomId} className="modal-toggle" />
      <dialog className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="text-lg font-bold">{props.title}</h3>
          <p className="py-2">{props.content}</p>

          <div className="modal-action">
            <label className=" btn" htmlFor={randomId} onClick={props.onCancel}>
              Hủy
            </label>
            <button className="btn btn-primary" onClick={props.onConfirm}>
              {props.confirmText || 'Xác nhận'}
            </button>
          </div>
        </form>
        <label
          className="modal-backdrop"
          htmlFor={randomId}
          onClick={props.onCancel}
        >
          Close
        </label>
      </dialog>
    </div>
  );
}
