import { SfButton, SfIconChevronLeft, SfIconChevronRight } from "@storefront-ui/react";
import classNames from "classnames";

export function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames("absolute !rounded-full z-10 left-4 bg-white hidden md:block", {
                "!hidden": disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronLeft />
        </SfButton>
    );
}

ButtonPrev.defaultProps = { disabled: false };

export function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
    return (
        <SfButton
            className={classNames("absolute !rounded-full z-10 right-4 bg-white hidden md:block", {
                "!hidden": disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronRight />
        </SfButton>
    );
}

ButtonNext.defaultProps = { disabled: false };
