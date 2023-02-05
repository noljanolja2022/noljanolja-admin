import { AccountType } from "../data/enums/AccountType";
import { ClientUser } from "../data/models/UserModels";

class UserService {
    saveUser(user?: ClientUser) {
        if (user == null) {
            localStorage.removeItem("user")
        } else {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }

    saveGoogleUser(id: string, name: string, email: string, picture: string) {
        this.saveUser({
            id: `google-${id}`,
            name: name,
            accountType: AccountType.GOOGLE,
            email: email,
            picture: picture
        })
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