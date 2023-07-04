import Collapse from '@/components/Collapse';
import { useAppDispatch } from '@/redux/hook';
import { setSearchAttribute } from '@/redux/searchSplice';
import TextInputWithRef from '@client/libs/shared/src/lib/TextInput';
import { useDebounceState } from '@client/libs/shared/src/lib/hooks';
import { AdvancedSearchDto } from '@client/libs/shared/src/lib/types/advancedSearchDto';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import React from 'react';
import { useQuery } from 'react-query';

export interface FilterProps {
  queryFn: (page: number, limit: number, keyword: string) => Promise<any>; // Hàm lấy dữ liệu
  queryKey: keyof AdvancedSearchDto; // Key của object AdvancedSearchDto
  placeholder: string; // Placeholder cho ô nhập liệu tìm kiếm
  label: string; // Nhãn hiển thị
}

export function Filter<T>({
  queryFn,
  queryKey,
  placeholder,
  label,
}: FilterProps) {
  const [selectedItems, setSelectedItems] = React.useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [keyword, setKeyword, unDebounceKeyword] = useDebounceState('', 2000);
  const { data: items, isLoading } = useQuery<
    PaginationDto<{
      id: string;
      name: string;
    }>
  >({
    queryKey: [queryKey, keyword],
    queryFn: () => queryFn(1, 10, keyword),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value, name } = e.target;
    if (checked) {
      setSelectedItems((prev) => [
        ...prev,
        {
          id: value,
          name: name,
        },
      ]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id !== value));
    }
  };
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(
      setSearchAttribute({
        key: queryKey,
        value: selectedItems.map((item) => item.id),
      })
    );
  }, [selectedItems, dispatch, queryKey]);
  React.useEffect(() => {
    const onClearSearch = () => {
      setSelectedItems([]);
    };
    window.addEventListener('clear-search', onClearSearch);
    return () => {
      window.removeEventListener('clear-search', onClearSearch);
    };
  }, []);
  return (
    <Collapse title={label}>
      <TextInputWithRef
        label={label}
        placeholder={placeholder}
        onChange={(e) => setKeyword(e.target.value)}
        value={unDebounceKeyword}
      />
      <h3 className="text-lg font-bold">
        {label} đã chọn ({selectedItems.length})
      </h3>
      {selectedItems.map((item) => (
        <div className="form-control" key={item.id}>
          <label className="cursor-pointer label justify-start gap-x-4">
            <input
              type="checkbox"
              value={item.id}
              name={item.name}
              className="checkbox checkbox-xs"
              defaultChecked
              onChange={handleChange}
            />
            <span className="label-text text-start">{item.name}</span>
          </label>
        </div>
      ))}

      <h3 className="text-lg font-bold">
        Danh sách {label} ({items?.items.length})
      </h3>
      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {items?.items.map((item) => (
        <div className="form-control" key={item.id}>
          <label className="cursor-pointer label justify-start gap-x-4">
            <input
              type="checkbox"
              value={item.id}
              name={item.name}
              className="checkbox checkbox-sm"
              onChange={handleChange}
              checked={selectedItems.some(
                (selectedItem) => selectedItem.id == item.id
              )}
            />
            <span className="label-text text-start">{item.name}</span>
          </label>
        </div>
      ))}
    </Collapse>
  );
}
