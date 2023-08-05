import React from 'react';
import {
  AiOutlineCheck,
  AiFillWarning,
  AiFillInfoCircle,
  AiOutlineClose,
} from 'react-icons/ai';
interface Props {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}
interface IToastData {
  [key: string]: {
    iconClass: string;
    icon: JSX.Element;
  };
}
const TOAST_DATA: IToastData = {
  success: {
    iconClass:
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200',
    icon: <AiOutlineCheck className="w-5 h-5" />,
  },
  warning: {
    iconClass:
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-yellow-800 dark:text-yellow-200',
    icon: <AiFillWarning className="w-5 h-5" />,
  },
  error: {
    iconClass:
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200',
    icon: <AiOutlineClose className="w-5 h-5" />,
  },
  info: {
    iconClass:
      'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200',
    icon: <AiFillInfoCircle className="w-5 h-5" />,
  },
};
export function Toast({ type, message, onClose }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current!.classList.remove('-right-full');
      ref.current!.classList.add('right-4');
    }
  }, [ref]);
  return (
    <div
      className="fixed z-50 toast toast-top -right-full transition-all duration-300 ease-in-out"
      ref={ref}
    >
      <div
        id="toast-success"
        className="flex items-center w-full max-w-xs min-w-[300px] p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className={TOAST_DATA[type].iconClass}>
          {TOAST_DATA[type].icon}
        </div>
        <div className="ml-3 text-sm font-normal"> {message}</div>
        <button
          onClick={onClose}
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
