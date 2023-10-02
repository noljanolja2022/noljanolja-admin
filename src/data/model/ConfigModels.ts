

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
}

export interface ApiVideoRewardConfigProgress {
    progress: number;
    point: number;
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
}

export interface VideoRewardConfigProgress {
    progress: number;
    point: number;
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