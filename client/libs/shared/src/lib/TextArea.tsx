import React from 'react';

interface ITextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

function TextArea(
  { label, error, ...props }: ITextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text font-bold">
            {label}
            {props.required && <span className="text-red-500"> *</span>}
          </span>
        </label>
      )}
      <div
        className={`relative  w-full ${
          error
            ? 'tooltip tooltip-open relative tooltip-top tooltip-error before:min-w-[200px]'
            : ''
        }`}
        data-tip={error}
      >
        <textarea
          className={`textarea  textarea-bordered h-24 ${
            error ? 'input-error' : ''
          }`}
          placeholder="Chú thích"
          style={{ width: '100%' }}
          {...props}
          ref={ref}
        ></textarea>
      </div>
    </div>
  );
}

const TextAreaWithRef = React.forwardRef(TextArea);
export default TextAreaWithRef;
