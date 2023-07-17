import { UserDto } from '@/lib/types/userDto';
import api from '../api';

class UserApiService {
  getToken() {
    return localStorage.getItem('token');
  }
  async getUserProfile() {
    const res = await api.get(`User/MyProfile`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return res.data as Promise<UserDto>;
  }
}

export default new UserApiService();
