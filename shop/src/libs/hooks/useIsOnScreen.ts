import React from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function useIsOnScreen<T extends HTMLElement>(): { ref: React.RefObject<T>; isOnScreen: boolean } {
    const ref = React.useRef<T>(null);
    const entry = useIntersectionObserver(ref, {});
    return { ref, isOnScreen: entry?.isIntersecting ?? false };
}
