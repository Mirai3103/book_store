import Collapse from '@/components/Collapse';
import TextInputWithRef from '@client/libs/shared/src/lib/TextInput';
import { useDebounceState } from '@client/libs/shared/src/lib/hooks';
import React from 'react';
import { useQuery } from 'react-query';
import authorApiService from '@client/libs/shared/src/lib/Utils/Services/authorApiService';
import { PaginationDto } from '@client/libs/shared/src/lib/types/paginationDto';
import { AuthorDto } from '@client/libs/shared/src/lib/types/authorDto';
export default function AuthorFilter() {
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [keyword, setKeyword, unDebounceKeyword] = useDebounceState('', 2000);
  const { data: authors, isLoading } = useQuery<PaginationDto<AuthorDto>>({
    queryKey: ['authors', keyword],
    queryFn: () => authorApiService.getAllAuthors(1, 10, keyword),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if checked push to selectedAuthors
    // else remove from selectedAuthors
    const { checked, value, name } = e.target;
    if (checked) {
      setSelectedAuthors((prev) => [
        ...prev,
        {
          id: value,
          name: name,
        },
      ]);
    } else {
      setSelectedAuthors((prev) =>
        prev.filter((author) => author.id !== value)
      );
    }
  };
  return (
    <Collapse title="Tác giả">
      <TextInputWithRef
        label="Tìm kiếm tác giả"
        placeholder="Tìm kiếm tác giả"
        onChange={(e) => setKeyword(e.target.value)}
        value={unDebounceKeyword}
      />
      <h3 className="text-lg font-bold">
        Tác giả đã chọn ({selectedAuthors.length})
      </h3>
      {selectedAuthors.map((author) => (
        <div className="form-control" key={author.id}>
          <label className="cursor-pointer label justify-start gap-x-4">
            <input
              type="checkbox"
              value={author.id}
              name={'author.name'}
              className="checkbox checkbox-xs"
              defaultChecked
              onChange={handleChange}
            />
            <span className="label-text text-start">{author.name}</span>
          </label>
        </div>
      ))}

      <h3 className="text-lg font-bold">
        Danh sách tác giả ({authors?.items.length})
      </h3>
      {isLoading && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {authors?.items.map((author) => (
        <div className="form-control" key={author.id}>
          <label className="cursor-pointer label justify-start gap-x-4">
            <input
              type="checkbox"
              value={author.id}
              name={author.name}
              className="checkbox checkbox-sm"
              onChange={handleChange}
              checked={selectedAuthors.some(
                (selectedAuthor) => Number(selectedAuthor.id) === author.id
              )}
            />
            <span className="label-text text-start">{author.name}</span>
          </label>
        </div>
      ))}
    </Collapse>
  );
}
