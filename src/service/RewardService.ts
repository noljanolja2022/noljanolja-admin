import { CheckinProgress } from "../data/model/CheckinModels";
import { ApiChatRewardConfig, ApiVideoRewardConfig, RoomType, UpdateVideoRewardPayload } from "../data/model/ConfigModels";
import { Result } from "../data/model/Result";
import api from './ApiClient';
import parseResponse from "./ResponseParse";

const urlPath = 'v1/reward';

class RewardService {
    async getVideoRewardConfigs(page: number, pageSize: number = 5): Promise<Result<Array<ApiVideoRewardConfig>>> {
        return parseResponse(await api.get('v1/reward/videos/configs', {
            params: {
                page,
                pageSize
            }
        }))
    }

    async updateVideoRewardConfig(payload: UpdateVideoRewardPayload) {
        return parseResponse(await api.put('v1/reward/videos/configs', payload))
    }

    async getVideoRewardConfig(videoId: string): Promise<Result<ApiVideoRewardConfig>> {
        return parseResponse(await api.get(`v2/reward/videos/configs/${videoId}`))
    }

    async getChatRewardConfigs(): Promise<Result<ApiChatRewardConfig[]>> {
        return parseResponse(await api.get(`v1/reward/chat/configs`))
    }

    async updateChatRewardConfig(
        roomType: RoomType,
        isActive: boolean,
        maxApplyTimes: number,
        onlyRewardCreator: boolean,
        rewardPoint: number,
        numberOfMessages: number) {
        const param: any = {
            roomType,
            isActive,
            maxApplyTimes,
            onlyRewardCreator,
            rewardPoint,
            numberOfMessages
        }
        return parseResponse(await api.put(`v1/reward/chat/configs`, param))
    }

    async getCheckinConfig() : Promise<Result<CheckinProgress[]>>{
        return parseResponse(await api.get(urlPath + '/checkin/configs'))
    }

    async updateCheckinConfig(configs: CheckinProgress[]) {
        const params = {
            configs
        }
        return parseResponse(await api.put(urlPath + '/checkin/configs', params))
    }
}

const rewardService = new RewardService();
export default rewardService;