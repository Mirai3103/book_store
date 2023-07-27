import { SfButton } from "@storefront-ui/react";
import React from "react";
import { useToggle } from "usehooks-ts";

interface Props extends React.HTMLAttributes<HTMLElement> {
    rawHtml: string;
}

export default function DescriptionSpoiler({ rawHtml, ...props }: Props) {
    const [isShowMore, toggleShowMore] = useToggle(false);
    return (
        <div className="mb-6">
            <article
                dangerouslySetInnerHTML={{
                    __html: rawHtml,
                }}
                className={`w-full px-8 mb-1 prose-sm ${isShowMore ? "" : `line-clamp-6`} transition duration-300 `}
            ></article>
            <div className="flex justify-center">
                <SfButton className=" text-center" size="sm" variant="secondary" onClick={toggleShowMore}>
                    {isShowMore ? "Thu gọn" : "Xem thêm"}
                </SfButton>
            </div>
        </div>
    );
}
