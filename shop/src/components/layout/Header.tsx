import type { AppSession } from "@/core/types/next-auth.type";
import {
  SfBadge,
  SfButton,
  SfIconExpandMore,
  SfIconFavorite,
  SfIconMenu,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfInput,
  useDisclosure,
} from "@storefront-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import useStore from "@/libs/hooks/useStore";
import useCartStore from "@/store/cartStore";
import useSessionStore from "@/store/sessionStore";
import DropDown from "../DropDown";
import CartDropDown from "../cart/CartDropDown";
import { signOut } from "next-auth/react";
import MegaMenu from "./MegaMenu";
import { useToast } from "../ui/use-toast";

const authMenu = [
  {
    children: "Thông tin tài khoản",
    href: "/user/profile",
  },
  {
    children: "Đơn hàng của tôi",
    href: "/user/orders",
  },
  {
    children: "Đăng xuất",
    onClick: () => signOut({ callbackUrl: "/", redirect: true }),
  },
];

export default function Header() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();

  const { fetch, cartItems } = useStore(useCartStore, (state) => state);
  const { clearSession, setSession, setStatus } = useStore(
    useSessionStore,
    (state) => state
  );
  console.log(session);
  React.useEffect(() => {
    if (session) {
      if ((session as any).error === "RefreshAccessTokenError") {
        signOut({ callbackUrl: "/", redirect: true });
      }
      const accessToken = (session as AppSession).accessToken;
      fetch?.(accessToken);
    }
  }, [fetch, session]);
  const { toast } = useToast();

  React.useEffect(() => {
    setStatus?.(status);
    if (status === "unauthenticated") {
      clearSession?.();
      toast({
        duration: 20000,
        title: "Chào ban!",
        description: "Sử dụng tài khoản: admin , pass: admin để test ",
        variant: "success",
      });
    }
  }, [status, clearSession, setStatus, toast]);
  React.useEffect(() => {
    setSession?.(session as AppSession);
  }, [session, setSession]);

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
  const { isOpen, toggle, close } = useDisclosure();
  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 text-white border-0 bg-primary-700">
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="inline-block font-bold text-xl mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          BookStore
        </Link>

        <MegaMenu />
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
            <CartDropDown
              cartItems={cartItems || []}
              open={isOpen}
              onClose={close}
              trigger={
                <SfButton
                  className="mr-2 relative -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                  aria-label={"card"}
                  variant="tertiary"
                  square
                  onClick={toggle}
                >
                  <SfIconShoppingCart />
                  <SfBadge content={cartItems?.length || 0} />
                </SfButton>
              }
            />
            {!session && (
              <SfButton
                className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                aria-label={"auth"}
                variant="tertiary"
                square
                slotPrefix={<SfIconPerson />}
                onClick={() => {
                  signIn();
                }}
              >
                <p className="hidden xl:inline-flex whitespace-nowrap">
                  Đăng nhập
                </p>
              </SfButton>
            )}
            {session && (
              <DropDown
                target={
                  <SfButton
                    className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                    aria-label={"auth"}
                    variant="tertiary"
                    square
                    slotPrefix={<SfIconPerson />}
                  >
                    <p className="hidden xl:inline-flex whitespace-nowrap">
                      {session.user?.name || session.user?.email}
                    </p>
                  </SfButton>
                }
              >
                {authMenu.map((item, index) => (
                  <DropDown.Item key={index} {...item} />
                ))}
              </DropDown>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
