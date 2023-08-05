import categoryApiService from './Utils/Services/categoryApiService';
import { CategoryDto } from './types/categoryDto';
import { PaginationDto } from './types/paginationDto';
import ComboBox from './combobox';
import { useDebounceState } from './hooks';
import React from 'react';
import { useQuery } from 'react-query';

export interface CategoryComboBoxProps {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function CategoryComboBox({
  onChange,
  value,
  defaultSearchValue,
  label = 'Thể loại',
  placeholder = 'Tìm kiếm thể loại',
  required,
}: CategoryComboBoxProps) {
  const [categoryKeyword, setCategoryKeyword, keywordUnDebounce] =
    useDebounceState('', 500);
  const { data: categories, isLoading: fetchCategorysLoading } = useQuery<
    CategoryDto,
    any,
    PaginationDto<CategoryDto>
  >({
    queryKey: ['categories', categoryKeyword],
    queryFn: () => categoryApiService.getAllCategories(1, 10, categoryKeyword),
  });
  React.useEffect(() => {
    if (defaultSearchValue) {
      setCategoryKeyword(defaultSearchValue);
    }
  }, [defaultSearchValue, setCategoryKeyword]);
  return (
    <ComboBox<CategoryDto>
      data={categories?.items || []}
      displayValue={(id) =>
        categories?.items?.find((x) => x.id === id)?.name || ''
      }
      getValue={(item) => item.id}
      inputValue={keywordUnDebounce}
      onChange={onChange}
      value={value}
      onInputChange={(e) => {
        setCategoryKeyword(e.target.value);
      }}
      required={required}
      placeholder={placeholder}
      label={label}
    ></ComboBox>
  );
}
