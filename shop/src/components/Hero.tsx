import { SfButton, SfScrollable } from "@storefront-ui/react";
import React from "react";
import Image from "next/image";
export interface IBannerItem {
    href: string;
    image: string;
}

interface Props {
    adBanners: IBannerItem[];
}

export default function Hero({ adBanners }: Props) {
    return (
        <div className="relative  mt-3">
            <div className="md:flex md:flex-row-reverse md:justify-center  max-w-[1536px] mx-auto">
                <SfScrollable
                    buttonsPlacement="floating"
                    className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    buttonNextAriaLabel={undefined}
                    buttonPrevAriaLabel={undefined}
                >
                    {adBanners.map((banner, index) => (
                        <Image
                            src={banner.image}
                            alt="Headphones"
                            className="h-full w-full object-cover object-left"
                            key={index}
                            width={1536}
                            height={600}
                        />
                    ))}
                </SfScrollable>
            </div>
        </div>
    );
}
