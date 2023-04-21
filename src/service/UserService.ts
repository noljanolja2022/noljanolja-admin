import { Result } from "../data/model/Result";
import { ApiUser } from "../data/model/UserModels";
import api from './ApiClient';
import parseResponse from "./ResponseParse";
class UserService {
    async fetchUser(): Promise<Result<ApiUser>> {
        return parseResponse<ApiUser>(await api.get('v1/users/me')) 
    }
}

const userService = new UserService();

export default userService;