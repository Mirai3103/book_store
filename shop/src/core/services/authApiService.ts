import { LoginRequest, LoginResponse, RegisterRequest } from "@appTypes/server-dto/authDto";
import axios from "axios";

class AuthApiService {
    public static async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>("/Auth/login", loginRequest);
        return response.data;
    }

    public static async register(registerRequest: RegisterRequest): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>("/Auth/register", registerRequest);
        return response.data;
    }
    public static async refreshToken(refreshToken: string): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>("/Auth/refresh-token", {
            refreshToken,
        });
        return response.data;
    }
    public static async logout(refreshToken: string = localStorage.getItem("refreshToken") || ""): Promise<void> {
        await axios.post("/Auth/logout", { refreshToken });
    }
}

export default AuthApiService;
