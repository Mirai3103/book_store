export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  password: string;
  email: string;
  displayName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
