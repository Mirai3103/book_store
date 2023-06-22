import publisherApiService from '@/Utils/Services/publisherApiService';
import { PaginationDto } from '@/types/paginationDto';
import { PublisherDto } from '@/types/publisherDto';
import ComboBox from '@client/libs/shared/src/lib/combobox';
import { useDebounceState } from '@client/libs/shared/src/lib/hooks';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function PublisherCombobox({
  onChange,
  value,
  defaultSearchValue,
  label = 'Nhà xuất bản',
  placeholder = 'Tìm kiếm nhà xuất bản',
  required,
}: Props) {
  const [publisherKeyword, setPublisherKeyword, keywordUnDebounce] =
    useDebounceState('', 500);
  const { data: publishers, isLoading: fetchPublishersLoading } = useQuery<
    PublisherDto,
    any,
    PaginationDto<PublisherDto>
  >({
    queryKey: ['publishers', publisherKeyword],
    queryFn: () =>
      publisherApiService.getAllPublishers(1, 10, publisherKeyword),
  });
  React.useEffect(() => {
    if (defaultSearchValue) {
      setPublisherKeyword(defaultSearchValue);
    }
  }, [defaultSearchValue, setPublisherKeyword]);

  return (
    <ComboBox<PublisherDto>
      data={publishers?.items || []}
      displayValue={(id) => {
        return publishers?.items?.find((x) => x.id == id)?.name || '';
      }}
      getValue={(item) => item.id}
      inputValue={keywordUnDebounce}
      onChange={onChange}
      required={required}
      value={value}
      onInputChange={(e) => {
        setPublisherKeyword(e.target.value);
      }}
      placeholder={placeholder}
      label={label}
    ></ComboBox>
  );
}
