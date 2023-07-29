import React from "react";
import { SfButton, SfDropdown, SfListItem, useDisclosure, useDropdown } from "@storefront-ui/react";
import { mergeClassNames } from "@/utils";
import { useRouter } from "next/router";
interface Props extends React.HTMLAttributes<HTMLUListElement> {
    target: React.ReactNode;
    children: React.ReactNode;
}
function DropDown({ target, children, className = "", style: _, ...props }: Props) {
    const { isOpen, close, toggle } = useDisclosure({
        initialValue: false,
    });

    const { refs, style } = useDropdown({ isOpen, onClose: close });
    return (
        <div ref={refs.setReference}>
            <div className="relative" onClick={toggle}>
                {target}
            </div>
            {isOpen && (
                <ul
                    className={mergeClassNames(
                        "z-50 max-w-[15rem] mr-4 shadow-lg text-black rounded bg-white border",
                        className
                    )}
                    ref={refs.setFloating}
                    style={style}
                >
                    {children}
                </ul>
            )}
        </div>
    );
}

interface DropDownItemProps extends React.HTMLAttributes<HTMLLIElement> {
    withDivider?: boolean;
    href?: string;
}

const DropDownItem = ({ children, href, withDivider, className = "", ...props }: DropDownItemProps) => {
    const { push } = useRouter();
    const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if (href) {
            e.preventDefault();
            push(href);
        }
    };
    return (
        <SfListItem
            onClick={onClick}
            className={mergeClassNames("px-2 py-1", className, withDivider ? "border-b" : "")}
            {...props}
        >
            {children}
        </SfListItem>
    );
};
DropDown.Item = DropDownItem;
export default DropDown;
