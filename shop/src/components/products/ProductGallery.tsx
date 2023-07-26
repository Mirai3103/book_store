import React from "react";
import type { BookImage } from "@appTypes/server-dto/bookImage";
import { useRef, useState } from "react";
import { useIntersection } from "react-use";
import {
    SfScrollable,
    SfButton,
    SfIconChevronLeft,
    SfIconChevronRight,
    type SfScrollableOnDragEndData,
} from "@storefront-ui/react";
import classNames from "classnames";
import Image from "next/image";
import { mergeClassNames } from "@/utils";
import { useMediaQuery } from "usehooks-ts";
export default function ProductGallery({ images, className = "", ...props }: IProductGalleryProps) {
    // const isDesktop = useMediaQuery("(min-width: 1024px)");
    return (
        <>
            <DesktopGallery images={images} className={mergeClassNames("lg:flex hidden", className)} {...props} />
            <MobileGallery images={images} className={mergeClassNames("lg:hidden", className)} {...props} />
        </>
    );
}

interface IProductGalleryProps extends React.HTMLAttributes<HTMLElement> {
    images: BookImage[];
}

export function DesktopGallery({ images, className = "" }: IProductGalleryProps) {
    const lastThumbRef = useRef<HTMLButtonElement>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const firstThumbRef = useRef<HTMLButtonElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const firstThumbVisible = useIntersection(firstThumbRef, {
        root: thumbsRef.current,
        rootMargin: "0px",
        threshold: 1,
    });

    const lastThumbVisible = useIntersection(lastThumbRef, {
        root: thumbsRef.current,
        rootMargin: "0px",
        threshold: 1,
    });

    const onDragged = (event: SfScrollableOnDragEndData) => {
        if (event.swipeRight && activeIndex > 0) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
        } else if (event.swipeLeft && activeIndex < images.length - 1) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
        }
    };

    return (
        <div className={mergeClassNames("relative flex w-full max-h-[600px] grow-0 max-w-[40%]", className)}>
            <SfScrollable
                ref={thumbsRef}
                className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                direction="vertical"
                activeIndex={activeIndex}
                prevDisabled={activeIndex === 0}
                nextDisabled={activeIndex === images.length - 1}
                slotPreviousButton={
                    <SfButton
                        className={classNames("absolute !rounded-full z-10 top-4 rotate-90 bg-white", {
                            hidden: firstThumbVisible?.isIntersecting,
                        })}
                        variant="secondary"
                        size="sm"
                        square
                        slotPrefix={<SfIconChevronLeft size="sm" />}
                    />
                }
                slotNextButton={
                    <SfButton
                        className={classNames("absolute !rounded-full z-10 bottom-4 rotate-90 bg-white", {
                            hidden: lastThumbVisible?.isIntersecting,
                        })}
                        variant="secondary"
                        size="sm"
                        square
                        slotPrefix={<SfIconChevronRight size="sm" />}
                    />
                }
            >
                {images.map(({ bookId, id, url }, index, thumbsArray) => (
                    <button
                        // eslint-disable-next-line no-nested-ternary
                        ref={index === thumbsArray.length - 1 ? lastThumbRef : index === 0 ? firstThumbRef : null}
                        type="button"
                        aria-current={activeIndex === index}
                        key={`${bookId}-${id}-${index}`}
                        className={classNames(
                            "md:w-[78px] md:h-auto relative shrink-0 pb-1 mx-4 -mb-2 border-b-4 snap-center cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0",
                            {
                                "border-primary-700": activeIndex === index,
                                "border-transparent": activeIndex !== index,
                            }
                        )}
                        onMouseOver={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                    >
                        <Image
                            alt={bookId.toString()}
                            className="border border-neutral-200"
                            width="78"
                            height="78"
                            src={url}
                        />
                    </button>
                ))}
            </SfScrollable>
            <SfScrollable
                className="w-full h-full  snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                activeIndex={activeIndex}
                direction="vertical"
                wrapperClassName="h-full m-auto"
                buttonsPlacement="none"
                isActiveIndexCentered
                drag={{ containerWidth: true }}
                onDragEnd={onDragged}
            >
                {images.map(({ bookId, id, url }, index) => (
                    <div
                        key={`${bookId}-${id}-${index}`}
                        className="flex  justify-center h-full basis-full shrink-0 grow snap-center"
                    >
                        <Image
                            aria-hidden={activeIndex !== index}
                            className="object-contain w-auto h-full aspect-[2/3]"
                            alt={id.toString()}
                            src={url}
                            width={300}
                            height={300}
                        />
                    </div>
                ))}
            </SfScrollable>
        </div>
    );
}
export function MobileGallery({ images, className = "" }: IProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div
            className={mergeClassNames(
                "relative max-h-[600px] mb-8 flex flex-col w-full aspect-[4/3] gap-1",
                className
            )}
        >
            <SfScrollable
                className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                wrapperClassName="group/scrollable h-full"
                activeIndex={activeIndex}
                isActiveIndexCentered
                prevDisabled={activeIndex === 0}
                nextDisabled={activeIndex === images.length - 1}
                buttonsPlacement="block"
                onPrev={() => {
                    setActiveIndex(() => activeIndex - 1);
                }}
                onNext={() => {
                    setActiveIndex(() => activeIndex + 1);
                }}
                slotPreviousButton={
                    <SfButton
                        className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 left-4 bg-white"
                        variant="secondary"
                        size="lg"
                        slotPrefix={<SfIconChevronLeft />}
                    />
                }
                slotNextButton={
                    <SfButton
                        className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 right-4 bg-white"
                        variant="secondary"
                        size="lg"
                        slotPrefix={<SfIconChevronRight />}
                    />
                }
            >
                {images.map(({ bookId, id, url }, index) => (
                    <div
                        className="relative flex justify-center basis-full snap-center snap-always shrink-0 grow"
                        key={`${bookId}-${id}-${index}`}
                    >
                        <Image
                            aria-label={`Thumbnail ${index + 1}`}
                            aria-hidden={activeIndex !== index}
                            className="object-contain w-auto h-full"
                            alt={id.toString()}
                            src={url}
                            draggable="false"
                            width={600}
                            height={600}
                        />
                    </div>
                ))}
            </SfScrollable>
            <div className="flex-shrink-0 basis-auto">
                <div className="flex-row w-full flex gap-0.5 mt [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {images.map(({ bookId, id, url }, index) => (
                        <button
                            key={`${bookId}-${id}-${index}`}
                            aria-label={`Thumbnail ${index + 1}`}
                            aria-current={activeIndex === index}
                            type="button"
                            className={classNames(
                                "w-full relative mt-1 border-b-4 transition-colors focus-visible:outline focus-visible:outline-offset-0",
                                {
                                    "border-primary-700": activeIndex === index,
                                    "border-gray-200": activeIndex !== index,
                                }
                            )}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
