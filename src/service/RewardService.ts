import { ApiVideoRewardConfig, VideoRewardConfigProgress } from "../data/model/ConfigModels";
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

    async updateVideoRewardConfig(videoId: string,
        isActive: boolean = true,
        maxApplyTimes: number = 1,
        progresses: VideoRewardConfigProgress[] = [],
        totalPoints: number = 0,
    ) {
        let param: any = {
            videoId, isActive, maxApplyTimes, rewardProgresses: progresses
        }
        if (totalPoints > 0) {
            param.totalPoints = totalPoints;
        }
        return parseResponse(await api.put('v1/reward/videos/configs', param))
    }

    async getVideoRewardConfig(videoId: string): Promise<Result<ApiVideoRewardConfig>> {
        return parseResponse(await api.get(`v2/reward/videos/configs/${videoId}`))
    }

    async updateChatRewardConfig() {

    }
}

const rewardService = new RewardService();
export default rewardService;