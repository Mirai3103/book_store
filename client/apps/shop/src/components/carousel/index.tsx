import React from 'react';
import { useIsFirstRender } from 'usehooks-ts';
interface ICarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  withIndicator?: boolean;
  children: React.ReactNode[];
  itemWidth?: string;
}

function Carousel({
  className = '',
  itemWidth = '100%',
  withIndicator,
  ...props
}: ICarouselProps) {
  const id = React.useId();
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    document.getElementById(id + activeIndex)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [activeIndex, id]);

  return (
    <div className="relative">
      <div className={`carousel ${className}`}>
        {props.children.map((child, index) => (
          <CarouselItem
            id={id}
            index={index}
            key={index}
            style={{
              width: itemWidth,
            }}
          >
            {child}
          </CarouselItem>
        ))}
      </div>
      {withIndicator && (
        <div className="absolute   flex justify-between transform -translate-y-1/2 left-0 right-0 z-20 top-1/2">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => {
              if (activeIndex === 0) return;
              setActiveIndex((prev) => prev - 1);
            }}
          >
            ❮
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => {
              if (activeIndex === props.children.length - 1) return;
              setActiveIndex((prev) => prev + 1);
            }}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
}

interface ICarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  index: number;
}

function CarouselItem({
  className = '',
  children,
  id,
  index,
  ...props
}: ICarouselItemProps) {
  return (
    <div
      id={id + index}
      className={`carousel-item  relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Item({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className=" ">{props.children}</div>;
}

Carousel.Item = Item;

export default Carousel;
