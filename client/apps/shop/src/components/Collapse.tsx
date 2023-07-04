import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Collapse({ title, children }: Props) {
  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-200">
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-lg font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
