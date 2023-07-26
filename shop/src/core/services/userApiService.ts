import { UpdateUserDto, UserDto } from "@appTypes/server-dto/userDto";
import axios from "axios";

class UserApiService {
    static async getUserProfile(access_token: string) {
        const res = await axios.get(`User/MyProfile`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return res.data as Promise<UserDto>;
    }
    static async updateUserProfile(user: UpdateUserDto, access_token: string) {
        const res = await axios.patch(`User/${user.id}`, user, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return res.data as Promise<UserDto>;
    }
}

export default UserApiService;
