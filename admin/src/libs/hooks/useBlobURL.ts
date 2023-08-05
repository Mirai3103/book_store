import React from 'react';

export default function useBlobURL() {
  const [blob, setBlob] = React.useState<Blob | null | undefined>(undefined);
  const [blobURL, setBlobURL] = React.useState<string | null | undefined>(
    undefined
  );
  React.useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setBlobURL((pre) => {
        if (pre) {
          URL.revokeObjectURL(pre);
        }
        return url;
      });
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setBlobURL((pre) => {
        if (pre) {
          URL.revokeObjectURL(pre);
        }
        return null;
      });
    }
  }, [blob]);
  return { blob, setBlob, blobURL, setBlobURL };
}
