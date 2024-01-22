

export interface ApiVideoRewardConfig {
    id: number;
    videoId: string;
    isActive: boolean;
    maxApplyTimes: number;
    totalPoints: number;
    minCommentLength: number;
    commentMaxApplyTimes: number;
    commentRewardPoints: number;
    likeMaxApplyTimes: number;
    likeRewardPoints: number;
    rewardProgresses: ApiVideoRewardConfigProgress[];
    accumulationConfigLog: string;
}

export interface ApiVideoRewardConfigProgress {
    progress: number;
    point: number;
}

export function convertApiVideoRewardConfigToVideoRewardConfig(apiVideoRewardConfig: ApiVideoRewardConfig): VideoRewardConfig {
    let accumulationConfigLog = JSON.parse(apiVideoRewardConfig.accumulationConfigLog)
    for (let i = 0; i < accumulationConfigLog.length; i++) {
        accumulationConfigLog[i].startTime = accumulationConfigLog[i].startTime.replace('T', ' ')
    }
    let rewardProgresses = apiVideoRewardConfig.rewardProgresses
    for (let i = 0; i < rewardProgresses.length; i++) {
        rewardProgresses[i].progress = rewardProgresses[i].progress * 100
    }
    return {
        id: apiVideoRewardConfig.id,
        videoId: apiVideoRewardConfig.videoId,
        isActive: apiVideoRewardConfig.isActive,
        maxApplyTimes: apiVideoRewardConfig.maxApplyTimes,
        totalPoints: apiVideoRewardConfig.totalPoints,
        minCommentLength: apiVideoRewardConfig.minCommentLength,
        commentMaxApplyTimes: apiVideoRewardConfig.commentMaxApplyTimes,
        commentRewardPoints: apiVideoRewardConfig.commentRewardPoints,
        likeMaxApplyTimes: apiVideoRewardConfig.likeMaxApplyTimes,
        likeRewardPoints: apiVideoRewardConfig.likeRewardPoints,
        rewardProgresses: apiVideoRewardConfig.rewardProgresses,
        accumulationConfigLog: accumulationConfigLog
    }
}

export interface VideoRewardConfig {
    id: number;
    videoId: string;
    isActive: boolean;
    maxApplyTimes: number;
    totalPoints: number;
    minCommentLength: number;
    commentMaxApplyTimes: number;
    commentRewardPoints: number;
    likeMaxApplyTimes: number;
    likeRewardPoints: number;
    rewardProgresses: VideoRewardConfigProgress[];
    accumulationConfigLog: AccumulationConfigLog[];
}

export interface VideoRewardConfigProgress {
    progress: number;
    point: number;
}

export interface AccumulationConfigLog {
    startTime: string;
    percentage: number;
}

export interface UpdateVideoRewardPayload {
    videoId: string;
    isActive: boolean;
    maxApplyTimes: number;
    rewardProgresses: VideoRewardConfigProgress[];
    totalPoints: number;
    minCommentLength: number;
    commentMaxApplyTimes: number;
    commentRewardPoints: number;
    likeMaxApplyTimes: number;
    likeRewardPoints: number;
    accumulationConfigLog: string;
}

export enum RoomType {
    SINGLE = 'SINGLE', GROUP = 'GROUP'
}

export interface ApiChatRewardConfig {
    roomType: RoomType;
    isActive: boolean;
    maxApplyTimes: number;
    onlyRewardCreator: boolean;
    rewardPoint: number;
    numberOfMessages: number;
}

export interface ChatRewardConfig {
    roomType: RoomType;
    isActive: boolean;
    maxApplyTimes: number;
    onlyRewardCreator: boolean;
    rewardPoint: number;
    numberOfMessages: number;
}

export interface ReferralConfig {
    refereePoints: number;
    refererPoints: number;
    updatedAt: Date;
}

export interface VideoPromotionSetting {
    id: number;
    videoId: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CoinExchangeConfig {
    point: number;
    coin: number;
    rewardRecurringAmount: number;
}