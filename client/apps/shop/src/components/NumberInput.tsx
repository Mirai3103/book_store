import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface IProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
  > {
  validation?: (value: number) => boolean;
  value?: number;
  onChange?: (value: number) => void;
  size?: keyof typeof SIZE;
}

const SIZE = {
  sm: {
    iconSize: 16,
    inputClass: 'w-12 input-sm',
    buttonClass: 'px-1 rounded-none',
  },
  md: {
    iconSize: 20,
    inputClass: 'w-24 ',
    buttonClass: '',
  },
};

export default function NumberInput({
  validation,
  value,
  onChange,
  size = 'md',
  ...props
}: IProps) {
  const [amount, setAmount] = React.useState(0);
  const minus = () => {
    if (validation && !validation(amount - 1)) {
      return;
    }
    setAmount(amount - 1);
    onChange && onChange(amount - 1);
  };
  const plus = () => {
    if (validation && !validation(amount + 1)) {
      return;
    }
    setAmount(amount + 1);
    onChange && onChange(amount + 1);
  };

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (validation && !validation(value)) {
      return;
    }
    setAmount(value);
    onChange && onChange(value);
  };
  React.useEffect(() => {
    if (value) {
      setAmount(value);
    }
  }, [value]);

  return (
    <label className="input-group">
      <span onClick={minus} className={SIZE[size].buttonClass}>
        <AiOutlineMinus size={SIZE[size].iconSize} />
      </span>
      <input
        placeholder="10"
        className={`input  input-bordered ${SIZE[size].inputClass}`}
        value={amount}
        onChange={handleChanged}
      />
      <span onClick={plus} className={SIZE[size].buttonClass}>
        <AiOutlinePlus size={SIZE[size].iconSize} />
      </span>
    </label>
  );
}
