import { Result } from "../data/model/Result";
import { ClientUser, User } from "../data/model/UserModels";
import api from './ApiClient';
import parseResponse from "./ResponseParse";
class UserService {
    saveUser(user?: ClientUser) {
        if (user === null) {
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }

    getUser(): ClientUser | null {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    async fetchUser(): Promise<Result<User>> {
        return parseResponse<User>(await api.get('v1/users/me')) 
    }
}

const userService = new UserService();

export default userService;