import Collapse from '@/components/Collapse';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  selectSearchAttribute,
  setSearchAttribute,
} from '@/redux/searchSplice';
import TextInputWithRef from '@client/libs/shared/src/lib/TextInput';
import React from 'react';

export default function MoneyRange() {
  const minPrice = useAppSelector((state) => state.search.minPrice);
  const maxPrice = useAppSelector((state) => state.search.maxPrice);
  const dispatch = useAppDispatch();
  const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      dispatch(setSearchAttribute({ key: 'maxPrice', value: Number(value) }));
    } else {
      dispatch(setSearchAttribute({ key: 'maxPrice', value: null }));
    }
  };
  const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      dispatch(setSearchAttribute({ key: 'minPrice', value: Number(value) }));
    } else {
      dispatch(setSearchAttribute({ key: 'minPrice', value: null }));
    }
  };
  return (
    <Collapse title="Khoảng giá">
      <TextInputWithRef
        label="Từ"
        type="number"
        value={minPrice || ''}
        onChange={onMinPriceChange}
      />
      <TextInputWithRef label="Đến" />
    </Collapse>
  );
}
