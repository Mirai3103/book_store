import React from "react";
import Layout from "../layout";
import { useRouter } from "next/router";
import classNames from "classnames";
const profileTabs = [
    {
        href: "/user/profile",
        label: "Hồ sơ",
        disabled: false,
    },
    {
        href: "/user/payment",
        label: "Thanh toán",
    },
    {
        href: "/user/address",
        label: "Địa chỉ",
    },
    {
        href: "/user/orders",
        label: "Đơn hàng",
    },
];
export default function UserLayout({ children }: { children: React.ReactNode }) {
    const { pathname, push } = useRouter();

    return (
        <Layout>
            <div className="mt-4 p-8 shadow-lg border ">
                <div className=" flex gap-2 mb-5 border-b border-b-neutral-200 pb-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {profileTabs.map((tab) => (
                        <button
                            key={tab.label}
                            type="button"
                            role="tab"
                            disabled={tab.disabled}
                            onClick={() => push(tab.href)}
                            className={classNames(
                                "px-4 py-2 rounded-md font-medium whitespace-nowrap text-neutral-500 hover:enabled:bg-primary-100 hover:enabled:text-primary-800 active:enabled:bg-primary-200 active:enabled:text-primary-900 disabled:text-disabled-500 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:shadow-[inset_0_0_0_4px_rgb(255,255,255)]",
                                { "!bg-neutral-100 !text-black": pathname.includes(tab.href) }
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="w-full h-full">{children}</div>
            </div>
        </Layout>
    );
}
