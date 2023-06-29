import { ApiChatRewardConfig, ApiVideoRewardConfig, RoomType, UpdateVideoRewardPayload, VideoRewardConfigProgress } from "../data/model/ConfigModels";
import { Result } from "../data/model/Result";
import parseResponse from "./ResponseParse";
import api from './ApiClient';

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
}

const rewardService = new RewardService();
export default rewardService;