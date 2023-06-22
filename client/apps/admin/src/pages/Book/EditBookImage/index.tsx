import bookApiService from '@/Utils/Services/bookApiService';
import LoadingScreen from '@/components/LoadingScreen';
import TextInputWithRef from '@/components/TextInput';
import { BookDto } from '@/types/bookDto';
import {
  getServerImageURL,
  imageURLToBlob,
} from '@client/libs/shared/src/lib/Utils';
import DropImage from '@client/libs/shared/src/lib/dropImage';
import { useBlobURL } from '@client/libs/shared/src/lib/hooks';
import { useNotification } from '@client/libs/shared/src/lib/toast';
import React from 'react';
import {
  AiOutlineClear,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineSave,
} from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Link, Navigate, useParams } from 'react-router-dom';
import EditAvatar from './EditAvatar';
import EditImages from './EditImages';

export default function EditBookImage() {
  const id = useParams().id;
  const {
    data: book,
    isLoading: isLoadingBookDetail,
    refetch,
    isFetched,
  } = useQuery<undefined, any, BookDto>({
    queryKey: ['book', id],
    queryFn: () => bookApiService.getBookDetail(id),
  });
  if (isLoadingBookDetail) {
    return <LoadingScreen />;
  }
  if (!id) return <Navigate to="/book" />;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">
          Sửa đổi hình ảnh cho sách
          <span className="font-bold ml-2 italic">
            {book?.title} #{id}
          </span>
        </h1>
        <Link to={'/book/edit/' + id} className="btn btn-warning">
          <AiOutlineEdit size={24} className="mr-2" />
          Sửa đổi thông tin
        </Link>
      </div>
      <EditAvatar avatar={book?.thumbnailUrl} bookId={id!} />
      <EditImages images={book!.bookImages} bookId={id!} />
    </div>
  );
}
