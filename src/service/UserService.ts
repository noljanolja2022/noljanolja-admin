import { signInWithEmailAndPassword } from "firebase/auth";
import { Result } from "../data/model/Result";
import { User, ApiUser } from "../data/model/UserModels";
import api from './ApiClient';
import parseResponse from "./ResponseParse";
import { firebaseAuthInstance } from "./FirebaseService";
class UserService {
    async fetchUser(): Promise<Result<ApiUser>> {
        return parseResponse<ApiUser>(await api.get('v1/users/me')) 
    }
}

const userService = new UserService();

export default userService;