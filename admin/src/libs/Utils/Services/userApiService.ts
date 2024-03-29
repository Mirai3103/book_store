import { UpdateUserDto, UserDto } from '@/libs/types/userDto';
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
  async updateUserProfile(user: UpdateUserDto) {
    const res = await api.patch(`User/${user.id}`, user, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });
    return res.data as Promise<UserDto>;
  }
}

export default new UserApiService();
