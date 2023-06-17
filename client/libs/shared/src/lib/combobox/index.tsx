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
}: IProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  return (
    <div className="form-control my-4">
      {label && (
        <label className="label">
          <span className="label-text font-bold">Chú thích</span>
        </label>
      )}
      <Combobox nullable value={value || ''} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full input input-bordered cursor-pointer py-2 pl-3 pr-10 text-sm leading-5 "
              displayValue={displayValue}
              placeholder={placeholder}
              onChange={onInputChange}
              defaultValue={''}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={onInputLoseFocus}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-base-100 py-1 text-base  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.length === 0 && inputValue !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Không tìm thấy kết quả
                </div>
              ) : (
                data.map((d) => (
                  <Combobox.Option
                    key={getValue(d)}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 text-base pr-4 ${
                        active ? 'bg-teal-600 ' : ''
                      }`
                    }
                    value={getValue(d)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {displayValue(getValue(d))}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <AiOutlineCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
