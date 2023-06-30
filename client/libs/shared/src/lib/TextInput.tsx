import React from 'react';
interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
function TextInput(
  {
    label,
    error,
    className = 'input input-bordered w-full ',
    ...props
  }: ITextInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="form-control w-full ">
      {label && (
        <label className="label">
          <span className="label-text font-bold">
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </span>
        </label>
      )}
      <div
        className={`relative ${
          error
            ? 'tooltip tooltip-open relative tooltip-top tooltip-error before:min-w-[200px]'
            : ''
        }`}
        data-tip={error}
      >
        <input
          className={`${className} ${error ? 'input-error' : ''}`}
          {...props}
          ref={ref}
        />
      </div>
    </div>
  );
}
const TextInputWithRef = React.forwardRef(TextInput);
export default TextInputWithRef;
