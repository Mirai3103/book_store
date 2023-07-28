import React, { useState } from "react";
import {
    SfButton,
    SfIconShoppingCart,
    SfIconFavorite,
    SfIconPerson,
    SfIconExpandMore,
    SfInput,
    SfIconSearch,
    SfIconMenu,
    SfIconArrowBack,
    SfBadge,
} from "@storefront-ui/react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import type { AppSession } from "@/core/types/next-auth.type";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
export default function Header() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { data: session } = useSession();
    const actionItems = [
        {
            icon: <SfIconShoppingCart />,
            label: "",
            ariaLabel: "Cart",
            role: "button",
        },
        {
            icon: <SfIconFavorite />,
            label: "",
            ariaLabel: "Wishlist",
            role: "button",
        },
    ];
    const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
    React.useEffect(() => {
        if (session) {
            const accessToken = (session as AppSession).accessToken;
            axios
                .get("/asp-net/api/CartItem", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    setCartItems(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [session]);
    const { push, events } = useRouter();
    const search = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        inputRef.current?.blur();
        push({
            pathname: "/search",
            query: {
                keyword: inputRef.current?.value,
            },
        });
    };
    React.useEffect(() => {
        const handleChanges = () => {
            inputRef.current!.value = "";
        };
        events.on("routeChangeComplete", handleChanges);
        return () => {
            events.off("routeChangeComplete", handleChanges);
        };
    }, [events]);

    return (
        <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 text-white border-0 bg-primary-700">
            <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
                <Link
                    href="/"
                    aria-label="SF Homepage"
                    className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
                >
                    <picture>
                        <source
                            srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
                            media="(min-width: 768px)"
                        />
                        <img
                            src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
                            alt="Sf Logo"
                            className="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
                        />
                    </picture>
                </Link>
                <SfButton
                    aria-label="Open categories"
                    className="lg:hidden order-first lg:order-1 mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                    square
                    variant="tertiary"
                >
                    <SfIconMenu />
                </SfButton>
                <SfButton
                    className="hidden lg:flex lg:mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                    type="button"
                    variant="tertiary"
                    slotSuffix={<SfIconExpandMore className="hidden lg:block" />}
                >
                    <span className="hidden lg:flex whitespace-nowrap">Browse products</span>
                </SfButton>
                <form
                    role="search"
                    className="flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
                    onSubmit={search}
                >
                    <SfInput
                        ref={inputRef}
                        type="search"
                        className="[&::-webkit-search-cancel-button]:appearance-none"
                        placeholder="Search"
                        wrapperClassName="flex-1 h-10 pr-0"
                        size="base"
                        slotSuffix={
                            <span className="flex items-center">
                                <SfButton
                                    variant="tertiary"
                                    square
                                    aria-label="search"
                                    type="submit"
                                    className="rounded-l-none hover:bg-transparent active:bg-transparent"
                                >
                                    <SfIconSearch />
                                </SfButton>
                            </span>
                        }
                    />
                </form>
                <nav className="flex-1 flex justify-end lg:order-last lg:ml-4">
                    <div className="flex flex-row flex-nowrap">
                        <SfButton
                            className="mr-2 relative -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                            aria-label={"card"}
                            variant="tertiary"
                            square
                        >
                            <SfIconShoppingCart />
                            <SfBadge content={cartItems.length} />
                        </SfButton>
                        <SfButton
                            className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                            aria-label={"auth"}
                            variant="tertiary"
                            square
                            slotPrefix={<SfIconPerson />}
                            onClick={() => {
                                if (session) {
                                } else {
                                    signIn();
                                }
                            }}
                        >
                            <p className="hidden xl:inline-flex whitespace-nowrap">
                                {session ? session.user!.name : "Đăng nhập"}
                            </p>
                        </SfButton>
                    </div>
                </nav>
            </div>
        </header>
    );
}
