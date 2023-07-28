import CartApiService from "@/core/services/cartApiService";
import { AppSession } from "@/core/types/next-auth.type";
import { CartItemDto } from "@/core/types/server-dto/cartItemDto";
import { create, StateCreator } from "zustand";
type Status = "authenticated" | "loading" | "unauthenticated";
export interface SessionState {
    session: AppSession | null;
    status: Status;
    setSession: (session: AppSession) => void;
    clearSession: () => void;
    setStatus: (status: Status) => void;
}
const createSessionSlice: StateCreator<SessionState> = (set, get) => ({
    session: null,
    status: "loading",
    clearSession: () => {
        set({
            session: null,
        });
    },
    setSession: (session: AppSession) => {
        set({
            session: {
                ...session,
            },
        });
    },
    setStatus: (status: Status) => {
        set({
            status,
        });
    },
});

const useSessionStore = create(createSessionSlice);
export default useSessionStore;
