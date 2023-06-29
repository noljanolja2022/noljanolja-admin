export interface Banner {
    id: number,
    title: string,
    description: string,
    content: string,
    image: string,
    isActive: boolean,
    priority: BannerPriority,
    action: BannerAction,
    startTime: Date,
    endTime: Date,
}

export enum BannerPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT",
}

export enum BannerAction {
    NONE = "NONE",
    LINK = "LINK",
    SHARE = "SHARE",
    CHECKIN = "CHECKIN",
}

export interface CreateBannerPayload {
    title: string,
    description: string,
    content: string,
    image: Nullable<File>,
    isActive: boolean,
    priority: BannerPriority,
    action: BannerAction,
    startTime: Date,
    endTime: Date,
}

export interface UpdateBannerPayload {
    id: number,
    title: string,
    description: string,
    content: string,
    image: Nullable<File> | string,
    isActive: boolean,
    priority: BannerPriority,
    action: BannerAction,
    startTime: Date,
    endTime: Date,
}