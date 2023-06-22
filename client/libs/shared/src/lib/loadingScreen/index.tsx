import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="w-full h-full grid place-content-center place-items-center">
      <progress className="progress w-56"></progress>
    </div>
  );
}
