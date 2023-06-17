import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export default function useDebounceState<T>(
  initialState: T,
  delay = 500
): [T, (value: T) => void, T] {
  const [state, setState] = useState(initialState);
  const debounceValue = useDebounce(state, delay);

  return [debounceValue, setState, state];
}
