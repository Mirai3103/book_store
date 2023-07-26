import { BookPreviewDto } from "@/core/types/server-dto/bookPreviewDto";
import { mergeClassNames } from "@/utils";
import React from "react";
import { ProductCardHorizontal } from "./ProductCard";
import { SfButton, SfLoaderCircular } from "@storefront-ui/react";
import Link from "next/link";
import useIsOnScreen from "@/libs/hooks/useIsOnScreen";

interface Props {
    name: string;
    hrefMore: string;
    className?: string;
    fetchFn: () => Promise<BookPreviewDto[]>;
    lazy?: boolean;
}

export default function RelatedVertical({ name, hrefMore, fetchFn, className = "", lazy = false }: Props) {
    const [products, setProducts] = React.useState<BookPreviewDto[] | undefined>();
    const { ref, isOnScreen } = useIsOnScreen<HTMLDivElement>();
    const isFetch = lazy ? isOnScreen : true;
    React.useEffect(() => {
        if (!products && isFetch) {
            fetchFn().then((res) => setProducts(res));
        }
    }, [products, fetchFn, isFetch]);

    return (
        <div className={className} ref={ref}>
            <div className="border shadow">
                <h4 className="typography-headline-4 py-2 mb-5 bg-primary-500 text-primary-25 px-4">{name}</h4>
                {products && products.map((product) => <ProductCardHorizontal key={product.id} product={product} />)}
                {!products && (
                    <div className="w-full flex justify-center py-20">
                        <SfLoaderCircular className="w-12" size="2xl" />
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-center">
                <SfButton as={Link} variant="secondary" href={hrefMore}>
                    Xem thêm
                </SfButton>
            </div>
        </div>
    );
}
