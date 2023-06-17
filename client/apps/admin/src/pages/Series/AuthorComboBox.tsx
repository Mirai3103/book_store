import authorApiService from '@/Utils/Services/authorApiService';
import { AuthorDto } from '@/types/authorDto';
import { PaginationDto } from '@/types/paginationDto';
import ComboBox from '@client/libs/shared/src/lib/combobox';
import { useDebounceState } from '@shared/hooks';
import React from 'react';
import { useQuery } from 'react-query';

export interface AuthorComboBoxProps {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
}

export default function AuthorComboBox({
  onChange,
  value,
  defaultSearchValue,
}: AuthorComboBoxProps) {
  const [authorKeyword, setAuthorKeyword] = useDebounceState('', 500);
  const { data: authors, isLoading: fetchAuthorsLoading } = useQuery<
    AuthorDto,
    any,
    PaginationDto<AuthorDto>
  >({
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
      inputValue={authorKeyword}
      onChange={onChange}
      value={value}
      onInputChange={(e) => {
        setAuthorKeyword(e.target.value);
      }}
      placeholder="Tìm kiếm tác giả"
      label="Tác giả"
    ></ComboBox>
  );
}
