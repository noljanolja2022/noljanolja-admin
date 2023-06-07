

export interface ApiVideoRewardConfig {
    id: number;
    videoId: string;
    isActive: boolean;
    maxApplyTimes: number;
    totalPoints: number;
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
    rewardProgresses: VideoRewardConfigProgress[];
}

export interface VideoRewardConfigProgress {
    progress: number;
    point: number;
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