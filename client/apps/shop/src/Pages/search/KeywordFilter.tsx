import Collapse from '@/components/Collapse';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setSearchAttribute } from '@/redux/searchSplice';
import TextInputWithRef from '@client/libs/shared/src/lib/TextInput';
import React from 'react';

export default function () {
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();
  return (
    <Collapse title="Từ khoá">
      <TextInputWithRef
        label="Từ khoá"
        value={keyword || ''}
        onChange={(e) => {
          dispatch(
            setSearchAttribute({ key: 'keyword', value: e.target.value })
          );
        }}
      />
    </Collapse>
  );
}
