import { Result } from "../data/model/Result";
import { ApiUser, UpdateUserPayload } from "../data/model/UserModels";
import { parseDateToIso } from "../util/DateUtil";
import api from './ApiClient';
import parseResponse from "./ResponseParse";
class UserService {
    async fetchUser(): Promise<Result<ApiUser>> {
        return parseResponse<ApiUser>(await api.get('v1/users/me'))
    }

    async getUsers(query: string = '', page: number = 1, pageSize: number = 5): Promise<Result<ApiUser[]>> {
        return parseResponse<ApiUser[]>(await api.get('v1/users', {
            params: {
                query,
                page,
                pageSize
            }
        }))
    }

    async createUser(req: UpdateUserPayload): Promise<Result<ApiUser>> {
        const payload = Object.assign({}, req) as any;
        if (req.dob) {
            payload.dob = parseDateToIso(req.dob)
        }
        return parseResponse<ApiUser>(await api.put(`v1/users`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async updateUser(userId: string, req: UpdateUserPayload): Promise<Result<ApiUser>> {
        const payload = Object.assign({}, req) as any;
        if (req.dob) {
            payload.dob = parseDateToIso(req.dob)
        }
        return parseResponse<ApiUser>(await api.patch(`v1/users/${userId}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async setUserActiveStatus(userId: string, status: boolean) {
        return parseResponse<ApiUser>(await api.patch(`v1/users/${userId}`, {
            isActive: status
        }))
    }

    async deleteUser(userId: string) {
        return parseResponse(await api.delete(`v1/users/${userId}`))
    }
}

const userService = new UserService();

export default userService;