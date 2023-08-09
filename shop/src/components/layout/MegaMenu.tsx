import CategoryApiService from "@/core/services/categoryApiService";
import { CategoryDto } from "@/core/types/server-dto/categoryDto";
import {
    SfButton,
    SfDrawer,
    SfIconClose,
    SfIconExpandMore,
    SfIconFavorite,
    SfIconMenu,
    SfIconPerson,
    SfIconShoppingCart,
    SfListItem,
    useDisclosure,
} from "@storefront-ui/react";
import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useClickAway } from "react-use";
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
    {
        icon: <SfIconPerson />,
        label: "Log in",
        ariaLabel: "Log in",
        role: "login",
    },
];

const bannerDetails = {
    image: "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/watch.png",
    title: "New in designer watches",
};
const categoriesContent = [
    {
        heading: "Women",
        items: [
            {
                title: "All Women's",
                link: "#",
            },
            {
                title: "Clothing",
                link: "#",
            },
            {
                title: "Shoes",
                link: "#",
            },
            {
                title: "Accessories",
                link: "#",
            },
            {
                title: "Wearables",
                link: "#",
            },
            {
                title: "Food & Drinks",
                link: "#",
            },
        ],
    },
    {
        heading: "Men",
        items: [
            {
                title: "All Men’s",
                link: "#",
            },
            {
                title: "Clothing",
                link: "#",
            },
            {
                title: "Shoes",
                link: "#",
            },
            {
                title: "Accessories",
                link: "#",
            },
            {
                title: "Wearables",
                link: "#",
            },
            {
                title: "Food & Drinks",
                link: "#",
            },
        ],
    },
    {
        heading: "Kids",
        items: [
            {
                title: "All Kids",
                link: "#",
            },
            {
                title: "Clothing",
                link: "#",
            },
            {
                title: "Shoes",
                link: "#",
            },
            {
                title: "Accessories",
                link: "#",
            },
            {
                title: "Wearables",
                link: "#",
            },
            {
                title: "Food & Drinks",
                link: "#",
            },
        ],
    },
];

export default function MegaMenu() {
    const { close, toggle, isOpen } = useDisclosure();
    const drawerRef = useRef(null);
    const menuRef = useRef(null);
    useClickAway(menuRef, () => {
        close();
    });
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    React.useEffect(() => {
        CategoryApiService.getAllCategories(1, 200)
            .then((res) => {
                setCategories(res.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <SfButton
                aria-label="Open categories"
                className="md:hidden order-first lg:order-1 mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                square
                variant="tertiary"
                onClick={toggle}
            >
                <SfIconMenu />
            </SfButton>
            <SfButton
                className="hidden md:flex text-white bg-transparent font-body hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                slotSuffix={<SfIconExpandMore className="hidden md:inline-flex" />}
                variant="tertiary"
                onClick={toggle}
                square
            >
                <span className="hidden md:inline-flex whitespace-nowrap px-2">Danh mục sách</span>
            </SfButton>
            <nav>
                <ul>
                    <li role="none">
                        <CSSTransition
                            in={isOpen}
                            timeout={500}
                            unmountOnExit
                            classNames={{
                                enter: "-translate-x-full md:opacity-0 md:translate-x-0",
                                enterActive: "translate-x-0 md:opacity-100 transition duration-500 ease-in-out",
                                exitActive:
                                    "-translate-x-full md:opacity-0 md:translate-x-0 transition duration-500 ease-in-out",
                            }}
                        >
                            <SfDrawer
                                ref={drawerRef}
                                open
                                disableClickAway
                                placement="top"
                                className="grid rounded-lg z-50 grid-cols-1 md:gap-x-6  bg-white shadow-xl p-0 max-h-screen overflow-y-auto md:!absolute md:!top-20 max-w-[376px] md:ml-6 md:max-w-6xl w-full md:p-6 mr-[50px] md:mr-0"
                            >
                                <div className="sticky top-0 flex items-center justify-between px-4 py-2 bg-primary-700 md:hidden">
                                    <div className="flex items-center font-medium text-white typography-text-lg">
                                        Danh mục sách
                                    </div>
                                    <SfButton
                                        square
                                        variant="tertiary"
                                        aria-label="Close navigation menu"
                                        onClick={close}
                                        className="text-white ml-2"
                                    >
                                        <SfIconClose />
                                    </SfButton>
                                </div>

                                <ul className="py-4 grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 md:max-h-[70vh] overflow-auto w-full md:py-0">
                                    {categories.map((item) => (
                                        <li key={item.id} className="py-2  md:py-0">
                                            <SfListItem
                                                as="a"
                                                size="sm"
                                                role="none"
                                                href={"/search?categoryIds=" + item.id}
                                                className="typography-text-base rounded-md text-black md:typography-text-sm py-4 md:py-1.5"
                                            >
                                                {item.name}
                                            </SfListItem>
                                        </li>
                                    ))}
                                </ul>
                            </SfDrawer>
                        </CSSTransition>
                    </li>
                </ul>
            </nav>
        </>
    );
}
