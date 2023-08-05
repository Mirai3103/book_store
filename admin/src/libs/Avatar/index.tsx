import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function Avatar({ src, alt, className = 'w-24' }: AvatarProps) {
  return (
    <div className="avatar">
      <div
        className={`${className} rounded-full border-2 border-primary !grid place-content-center place-items-center text-center ring-offset-base-100 ring-offset-2`}
      >
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span className="text-2xl">{alt[0]}</span>
        )}
      </div>
    </div>
  );
}
