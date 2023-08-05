import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { HiOutlineSelector } from 'react-icons/hi';
import { AiOutlineCheck } from 'react-icons/ai';
interface IProps<T> {
  value: string | number | null | undefined;
  getValue: (item: T) => string | number | null | undefined;
  onChange: (value: string | number | null | undefined) => void;
  data: T[];
  displayValue: (item: string | number | null | undefined) => string;
  placeholder?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputLoseFocus?: () => void;
  inputValue: string;
  label?: string;
  required?: boolean;
}

export default function ComboBox<T>({
  value,
  onChange,
  displayValue,
  getValue,
  placeholder,
  inputValue,
  onInputChange,
  data,
  onInputLoseFocus,
  label,
  required = false,
}: IProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = (item: T | undefined) => {
    if (!item) {
      onInputChange?.({
        target: { value: '' },
      } as any);
      onChange(null);
      return;
    }
    onInputChange?.({
      target: { value: displayValue(getValue(item)) },
    } as any);
    onChange(getValue(item));
  };

  const id = React.useMemo(() => Math.random(), []);
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </label>
      <div className=" dropdown ">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full "
          required={required}
          tabIndex={id}
          value={inputValue}
          onChange={onInputChange}
        />
        <ul
          tabIndex={id}
          className="p-2 gap-y-1 shadow z-10 flex-col flex-nowrap overflow-y-auto menu menu-md dropdown-content bg-base-200 rounded-box w-full max-h-72 "
        >
          <li onClick={() => handleClick({} as T)}>
            <a
              className={`${
                !value ? 'bg-primary-focus text-primary-content ' : ''
              }`}
            >
              {'Không chọn'} - {'Không chọn'}
            </a>
          </li>
          {data.map((item) => (
            <li key={getValue(item)} onClick={() => handleClick(item)}>
              <a
                className={`${
                  value === getValue(item)
                    ? 'bg-primary-focus text-primary-content '
                    : ''
                }`}
              >
                {getValue(item)} - {displayValue(getValue(item))}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
