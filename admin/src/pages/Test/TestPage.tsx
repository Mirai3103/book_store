import React from 'react';
import DropImage from '@shared/dropImage';

export default function TestPage() {
  const [file, setFile] = React.useState<Blob | undefined | null>(undefined);

  return (
    <div className="w-60">
      <DropImage
        aspectRatio={3 / 4}
        value={file}
        onChange={setFile}
        defaultImageURL="https://static.wikia.nocookie.net/sonypicturesanimation/images/9/9f/Profile_-_Peni_Parker.png"
      />
    </div>
  );
}
