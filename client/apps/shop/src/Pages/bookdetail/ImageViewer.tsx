import React from 'react';
import { createPortal } from 'react-dom';
interface Props {
  listSource: string[];
  setIsShow: (isShow: boolean) => void;
}

export default function ImageViewer({ listSource, setIsShow }: Props) {
  const [index, setIndex] = React.useState(0);
  const handleNext = React.useCallback(() => {
    setIndex((index + 1) % listSource.length);
  }, [index, listSource.length]);
  const handlePrev = React.useCallback(() => {
    setIndex((index - 1 + listSource.length) % listSource.length);
  }, [index, listSource.length]);
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const element = (
    <div className="fixed w-screen h-screen z-40  bg-black bg-opacity-95 top-0 left-0 flex justify-center items-center">
      <div className="absolute top-10 transform -translate-y-1/2 right-10 z-50">
        <button
          className="btn btn-circle btn-ghost text-5xl"
          onClick={() => setIsShow(false)}
        >
          <span aria-label="X" role="img">
            ❌
          </span>
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-10 z-50">
        <button
          className="btn btn-circle btn-ghost text-5xl"
          onClick={handlePrev}
        >
          ❮
        </button>
      </div>
      <div className="">
        <img src={listSource[index]} alt="" className="max-h-[80vh]" />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-10 z-50 ">
        <button
          className="btn btn-circle btn-ghost text-5xl"
          onClick={handleNext}
        >
          ❯
        </button>
      </div>
      <div className="absolute bottom-2 left-10 flex items-center gap-x-3">
        {listSource.map((item, i) => (
          <img
            className={
              'w-20 h-20 border-4 rounded-md cursor-pointer ' +
              (i === index ? ' border-primary' : ' border-gray-400 ')
            }
            src={item}
            alt=""
            key={i}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
  return createPortal(element, document.body);
}
//      ❯ ❮
