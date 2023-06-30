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
        className={`${className} rounded-full ring ring-primary !grid place-content-center place-items-center text-center ring-offset-base-100 ring-offset-2`}
      >
        {src ? (
          <img
            src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt={alt}
          />
        ) : (
          <span className="text-2xl">{alt[0]}</span>
        )}
      </div>
    </div>
  );
}
