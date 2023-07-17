import authorApiService from './Utils/Services/authorApiService';
import { AuthorDto } from './types/authorDto';
import { PaginationDto } from './types/paginationDto';
import ComboBox from './combobox';
import { useDebounceState } from './hooks';
import React from 'react';
import { useQuery } from 'react-query';

export interface AuthorComboBoxProps {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export default function AuthorComboBox({
  onChange,
  value,
  defaultSearchValue,
  required,
  label = 'Tác giả',
  placeholder = 'Tìm kiếm tác giả',
}: AuthorComboBoxProps) {
  const [authorKeyword, setAuthorKeyword, keywordUnDebounce] = useDebounceState(
    defaultSearchValue || '',
    500
  );
  const { data: authors, isLoading: fetchAuthorsLoading } = useQuery({
    queryKey: ['authors', authorKeyword],
    queryFn: () => authorApiService.getAllAuthors(1, 10, authorKeyword),
  });
  React.useEffect(() => {
    if (defaultSearchValue) {
      setAuthorKeyword(defaultSearchValue);
    }
  }, [defaultSearchValue, setAuthorKeyword]);
  return (
    <ComboBox<AuthorDto>
      data={authors?.items || []}
      displayValue={(id) =>
        authors?.items?.find((x) => x.id === id)?.name || ''
      }
      getValue={(item) => item.id}
      inputValue={keywordUnDebounce}
      onChange={onChange}
      value={value}
      onInputChange={(e) => {
        setAuthorKeyword(e.target.value);
      }}
      required={required}
      placeholder={placeholder}
      label={label}
    ></ComboBox>
  );
}
