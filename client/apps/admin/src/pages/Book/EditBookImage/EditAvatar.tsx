import bookApiService from '@shared/Utils/Services/bookApiService';
import {
  getServerImageURL,
  imageURLToBlob,
} from '@client/libs/shared/src/lib/Utils';
import DropImage from '@client/libs/shared/src/lib/dropImage';
import { useNotification } from '@client/libs/shared/src/lib/toast';
import React from 'react';
import { AiOutlineClear, AiOutlineSave } from 'react-icons/ai';

interface Props {
  avatar?: string;
  bookId: string;
}

export default function EditAvatar({ avatar, bookId }: Props) {
  const toast = useNotification();
  const [isAvatarChanged, setIsAvatarChanged] = React.useState(false);
  const [avatarBlob, setAvatarBlob] = React.useState<Blob | null>(null);

  const handleSaveAvatar = async () => {
    if (!isAvatarChanged) {
      toast.show({
        message: 'Ảnh đại diện không thay đổi',
        type: 'error',
        duration: 3000,
      });
      return;
    }
    if (!avatarBlob) {
      toast.show({
        message: 'Ảnh đại diện không hợp lệ',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    bookApiService.updateBookCover(bookId, avatarBlob as File).then(() => {
      toast.show({
        message: 'Cập nhật thành công',
        type: 'success',
      });
    });
  };
  const handleResetAvatar = async () => {
    setIsAvatarChanged(false);
    setAvatarBlob(await imageURLToBlob(getServerImageURL(avatar)));
  };
  const handleAvatarChange = React.useCallback((blob: Blob | null) => {
    setAvatarBlob(blob);
    setIsAvatarChanged(true);
  }, []);
  return (
    <>
      <h2 className="text-2xl font-semibold">Ảnh đại diện</h2>
      <div className="flex flex-col items-center">
        <div className="w-60 flex flex-col">
          <DropImage
            aspectRatio={3 / 4}
            defaultImageURL={getServerImageURL(avatar)}
            onChange={handleAvatarChange}
            value={avatarBlob}
          />
        </div>
        <div className="btn-group my-4">
          <button className="btn btn-outline" onClick={handleResetAvatar}>
            <AiOutlineClear size={20} className="mr-2" />
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleSaveAvatar}>
            <AiOutlineSave size={20} className="mr-2" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </>
  );
}
