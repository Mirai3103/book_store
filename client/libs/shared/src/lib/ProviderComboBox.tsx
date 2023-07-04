import providerApiService from './Utils/Services/providerApiService';
import { ProviderDto } from './types/providerDto';
import { PaginationDto } from './types/paginationDto';
import ComboBox from './combobox';
import { useDebounceState } from './hooks';
import React from 'react';
import { useQuery } from 'react-query';

export interface ProviderComboBoxProps {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function ProviderComboBox({
  onChange,
  value,
  defaultSearchValue,
  label = 'Nhà cung cấp',
  placeholder = 'Tìm kiếm nhà cung cấp',
  required,
}: ProviderComboBoxProps) {
  const [providerKeyword, setProviderKeyword, keywordUnDebounce] =
    useDebounceState('', 500);
  const { data: providers, isLoading: fetchProvidersLoading } = useQuery<
    ProviderDto,
    any,
    PaginationDto<ProviderDto>
  >({
    queryKey: ['providers', providerKeyword],
    queryFn: () => providerApiService.getAllProviders(1, 10, providerKeyword),
  });
  React.useEffect(() => {
    if (defaultSearchValue) {
      setProviderKeyword(defaultSearchValue);
    }
  }, [defaultSearchValue, setProviderKeyword]);
  return (
    <ComboBox<ProviderDto>
      data={providers?.items || []}
      displayValue={(id) =>
        providers?.items?.find((x) => x.id === id)?.name || ''
      }
      getValue={(item) => item.id}
      inputValue={keywordUnDebounce}
      onChange={onChange}
      value={value}
      onInputChange={(e) => {
        setProviderKeyword(e.target.value);
      }}
      placeholder={placeholder}
      label={label}
      required={required}
    ></ComboBox>
  );
}
