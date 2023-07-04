import bookApiService from '@shared/Utils/Services/bookApiService';
import TextInputWithRef from '@/components/TextInput';
import { BookAttribute } from '@/types/bookAttribute';
import { BookImage } from '@/types/bookImage';
import { getServerImageURL } from '@client/libs/shared/src/lib/Utils';
import { useNotification } from '@client/libs/shared/src/lib/toast';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
interface Props {
  images: BookImage[];
  bookId: string;
}

export default function EditImages({ images, bookId }: Props) {
  const toast = useNotification();
  const [deletedImages, setDeletedImages] = React.useState<string[]>([]);
  const [newImages, setNewImages] = React.useState<File[]>([]);
  const listImageURL = React.useMemo(() => {
    const list: { index: number; url: string }[] = [];
    list.push(
      ...images
        .map((i) => i.url)
        .filter((i) => !deletedImages.includes(i))
        .map((url, index) => ({ index, url }))
    );
    list.push(
      ...newImages.map((i, index) => ({ index, url: URL.createObjectURL(i) }))
    );
    return list;
  }, [images, deletedImages, newImages]);

  React.useEffect(() => {
    return () => {
      listImageURL.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, [listImageURL]);
  const onReset = () => {
    setDeletedImages([]);
    setNewImages([]);
  };

  const onSaveAll = () => {
    if (newImages.length === 0 && deletedImages.length === 0) {
      toast.show({
        message: 'Không có thay đổi',
        type: 'error',
        duration: 3000,
      });
      return;
    }
    bookApiService
      .updateBookImages(bookId, newImages, deletedImages)
      .then(() => {
        toast.show({
          message: 'Cập nhật thành công',
          type: 'success',
        });
      });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Ảnh minh họa</h2>
      <div className="mx-8 my-5 gap-3 flex items-end">
        <TextInputWithRef
          label="Thêm ảnh minh họa"
          type="file"
          className="file-input file-input-bordered w-full"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setNewImages((prev) => [...prev, ...Array.from(files)]);
            }
            e.target.value = '';
            e.target.files = null;
          }}
        />
        <button className="btn btn-primary" onClick={onSaveAll}>
          Lưu tất cả
        </button>
        <button className="btn btn-outline ml-2" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="grid gap-5 grid-cols-4">
        {listImageURL.map((url) => (
          <div
            className="flex  flex-col w-full h-full relative items-center"
            key={url.url}
          >
            <button
              onClick={() => {
                if (images.find((i) => i.url === url.url)) {
                  setDeletedImages((prev) => [...prev, url.url]);
                } else {
                  setNewImages((prev) =>
                    prev.filter((i, index) => index !== url.index)
                  );
                }
              }}
              className="absolute top-0 right-0 z-10 p-1 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 translate-x-1/2 -translate-y-1/2"
            >
              <AiOutlineClose size={20} />
            </button>
            <img
              src={getServerImageURL(url.url)}
              alt={url.url}
              className="w-full h-auto object-cover border-primary rounded-xl hover:shadow-xl border-solid border"
            />
          </div>
        ))}
      </div>
    </>
  );
}
