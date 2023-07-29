import axios from "axios";
import NextAuth, { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
// post localhost:5250/Auth/login {"username": "string","password": "string","isRemember": true}
// post localhost:5250/Auth/refresh-token  {"refreshToken": "string" }
type ICredentials = Record<"username" | "password" | "isRemember", string> | undefined;

interface IAppUser extends User {
    token: {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiry?: Date;
    };
}

export const AUTH_OPTIONS: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                isRemember: { label: "Remember Me", type: "checkbox" },
            },
            authorize: async (credentials: ICredentials) => {
                const apiUrl = process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL || "http://localhost:5250";
                if (!credentials) return null;
                const { username, password, isRemember } = credentials;

                const res = await axios.post(`${apiUrl}/Auth/login`, {
                    username,
                    password,
                    isRemember: isRemember == "on",
                });
                const data = res.data;

                const decoded: any = jwt_decode(data.accessToken);
                if (data) {
                    const user: IAppUser = {
                        id: data.user.id,
                        name: data.user.displayName,
                        email: data.user.email,
                        image: data.user.avatarUrl,
                        token: {
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                            accessTokenExpiry: new Date(Number(decoded.exp) * 1000),
                        },
                    } as any;
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const appUser = user as IAppUser;
            if (appUser) {
                token.accessToken = appUser.token.accessToken;
                token.refreshToken = appUser.token.refreshToken;
                token.accessTokenExpiry = appUser.token.accessTokenExpiry;
            }

            const now = new Date();

            const exp = token.accessTokenExpiry ? new Date(token.accessTokenExpiry as any) : now;
            console.log({
                exp: exp.getTime(),
                now: now.getTime(),
                diff: exp.getTime() - now.getTime(),
            });
            const shouldRefreshToken = exp.getTime() - now.getTime() < 60 * 1000 * 5;
            if (!shouldRefreshToken) {
                return Promise.resolve(token);
            }
            const newToken = await refreshToken(token);
            return Promise.resolve(newToken);
        },
        async session({ session, token }) {
            const appSession = session as any;
            appSession.accessToken = token.accessToken;
            appSession.accessTokenExpiry = token.accessTokenExpiry;
            appSession.error = token.error || null;

            return Promise.resolve(session);
        },
    },
    secret: process.env.SECRET || "secret",
};
export default NextAuth(AUTH_OPTIONS);

async function refreshToken(token: JWT) {
    console.log("refreshToken");
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_ASP_NET_SERVER_URL}/Auth/refresh-token`, {
            refreshToken: token.refreshToken,
        });
        return {
            ...token,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            accessTokenExpiry: res.data.accessTokenExpiry,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
