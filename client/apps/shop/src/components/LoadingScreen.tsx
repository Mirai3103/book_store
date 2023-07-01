import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <progress className="progress w-64"></progress>
    </div>
  );
}
