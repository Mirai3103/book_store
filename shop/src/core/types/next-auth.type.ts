import type { ISODateString, Session, User } from "next-auth";
import type { UserProfile } from "./server-dto/authDto";
export interface AppSession extends Session {
    accessToken: string;
    accessTokenExpiry: Date | string;
    error: string;
    expires: ISODateString;
    user: AppUser;
}

export type AppUser = User & UserProfile;
