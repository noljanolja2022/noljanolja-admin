import { ClientUser } from "../data/model/UserModels";
class UserService {
    saveUser(user?: ClientUser) {
        if (user == null) {
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
}

export default new UserService();