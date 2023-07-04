import seriesApiService from './Utils/Services/seriesApiService';
import { SeriesDto } from './types/seriesDto';
import { PaginationDto } from './types/paginationDto';
import ComboBox from './combobox';
import { useDebounceState } from './hooks';
import React from 'react';
import { useQuery } from 'react-query';

export interface SeriesComboBoxProps {
  onChange: (value: number | string | undefined | null) => void;
  value: number | string | undefined | null;
  defaultSearchValue?: string;
  label?: string;
  placeholder?: string;
}

export default function SeriesComboBox({
  onChange,
  value,
  defaultSearchValue,
  label = 'Bộ sách',
  placeholder = 'Tìm kiếm bộ sách',
}: SeriesComboBoxProps) {
  const [seriesKeyword, setSeriesKeyword, keywordUnDebounce] = useDebounceState(
    '',
    500
  );
  const { data: serieses, isLoading: fetchSeriessLoading } = useQuery<
    SeriesDto,
    any,
    PaginationDto<SeriesDto>
  >({
    queryKey: ['serieses', seriesKeyword],
    queryFn: () => seriesApiService.getAllSeries(1, 10, seriesKeyword),
  });
  React.useEffect(() => {
    if (defaultSearchValue) {
      setSeriesKeyword(defaultSearchValue);
    }
  }, [defaultSearchValue, setSeriesKeyword]);
  return (
    <ComboBox<SeriesDto>
      data={serieses?.items || []}
      displayValue={(id) =>
        serieses?.items?.find((x) => x.id === id)?.name || ''
      }
      getValue={(item) => item.id}
      inputValue={keywordUnDebounce}
      onChange={onChange}
      value={value}
      onInputChange={(e) => {
        setSeriesKeyword(e.target.value);
      }}
      placeholder={placeholder}
      label={label}
    ></ComboBox>
  );
}
