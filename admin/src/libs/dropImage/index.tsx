import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { imageURLToBlob } from '../Utils';

interface IProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  aspectRatio: number;
  value?: Blob | undefined | null;
  onChange?: (value: Blob | null) => void;
  defaultImageURL?: string | null;
}

export default function DropImage({
  aspectRatio,
  onChange,
  value,
  defaultImageURL,
  ...props
}: IProps) {
  const id = React.useId();
  const [url, setUrl] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setUrl(undefined);
    }
  }, [value]);
  React.useEffect(() => {
    if (defaultImageURL) {
      imageURLToBlob(defaultImageURL).then((blob) => {
        onChange?.(blob);
      });
    }
  }, [defaultImageURL, onChange]);

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      {url ? (
        <div className="w-full h-full relative">
          <button
            className="absolute top-0 right-0 z-10 p-1 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 translate-x-1/2 -translate-y-1/2"
            onClick={() => {
              onChange?.(null);
            }}
          >
            <AiOutlineClose size={20} />
          </button>

          <img
            src={url}
            className="w-full h-full object-cover flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            alt=""
          />
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Nhấn để tải lên</span> hoặc kéo và
              thả vào đây
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG
            </p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            multiple={false}
            {...props}
            onChange={(e) => {
              if (onChange) {
                onChange(e.target.files?.[0] ?? null);
              }
            }}
          />
        </label>
      )}
    </div>
  );
}
