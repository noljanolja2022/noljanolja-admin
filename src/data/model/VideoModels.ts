export interface Video {
    id: string,
    url: string,
    publishedAt: Date,
    title: string,
    thumbnail: string,
    duration: string,
    durationMs: number,
    viewCount: number,
    likeCount: number,
    favoriteCount: number,
    commentCount: number,
    isHighlighted: boolean,
    availableFrom: Date | null,
    availableTo: Date | null,
    isDeactivated: boolean,
    channel: Channel,
    category: Category
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

export interface VideoAnalytic {
    id: string,
    title: string,
    thumbnail: string,
    url: string,
    viewCount: number,
    likeCount: number,
    favoriteCount: number,
    commentCount: number,
    rewardedPoints: number,
}

export interface PromotedVideoConfig {
    id: number;
    startDate: Date;
    endDate: Date;
    autoPlay: boolean;
    autoLike: boolean;
    autoComment: boolean;
    autoSubscribe: boolean;
    interactionDelay: number;
    video: Video
}

export interface Channel {
    id: string,
    title: string,
    thumbnail: string
}

export interface Category {
    id: string,
    title: string
}