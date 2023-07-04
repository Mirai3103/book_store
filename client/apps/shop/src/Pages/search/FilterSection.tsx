import { useAppDispatch } from '@/redux/hook';
import React from 'react';
import authorApiService from '@client/libs/shared/src/lib/Utils/Services/authorApiService';
import categoryApiService from '@client/libs/shared/src/lib/Utils/Services/categoryApiService';
import publisherApiService from '@client/libs/shared/src/lib/Utils/Services/publisherApiService';
import providerApiService from '@client/libs/shared/src/lib/Utils/Services/providerApiService';
import { Filter } from './Filter';
import Collapse from '@/components/Collapse';
import { resetSearch } from '@/redux/searchSplice';
import TextInputWithRef from '@client/libs/shared/src/lib/TextInput';
import MoneyRange from './MoneyRange';
import KeywordFilter from './KeywordFilter';

export default function FilterSection() {
  const dispatch = useAppDispatch();
  return (
    <div className="w-1/4 flex flex-col gap-3 p-3">
      <h2 className="text-2xl font-bold">Tuỳ chọn tìm kiếm</h2>
      <KeywordFilter />
      <MoneyRange />
      <Filter
        label="Tác giả"
        queryFn={authorApiService.getAllAuthors}
        queryKey="authorIds"
        placeholder="Tìm kiếm tác giả"
      />

      <Filter
        label="Thể loại"
        queryFn={categoryApiService.getAllCategories}
        queryKey="categoryIds"
        placeholder="Tìm kiếm thể loại"
      />
      <Filter
        label="Nhà xuất bản"
        queryFn={publisherApiService.getAllPublishers}
        queryKey="publisherIds"
        placeholder="Tìm kiếm nhà xuất bản"
      />
      <Filter
        label="Nhà cung cấp"
        queryKey="providerIds"
        placeholder="Tìm kiếm nhà cung cấp"
        queryFn={providerApiService.getAllProviders}
      />

      <button className="btn btn-primary">Áp dụng lọc</button>
      <button
        className="btn btn-primary btn-outline"
        onClick={() => {
          dispatch(resetSearch());
        }}
      >
        Xóa lọc
      </button>
    </div>
  );
}