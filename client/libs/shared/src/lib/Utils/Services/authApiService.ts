import { LoginRequest, LoginResponse } from '@/lib/types/authDto';
import api from '../api';

class AuthApiService {
  public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/Auth/login', loginRequest);
    return response.data;
  }

  public async register(loginRequest: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      '/Auth/register',
      loginRequest
    );
    return response.data;
  }
  public async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/Auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  }
  public async logout(
    refreshToken: string = localStorage.getItem('refreshToken') || ''
  ): Promise<void> {
    await api.post('/Auth/logout', { refreshToken });
  }
}

export default new AuthApiService();
