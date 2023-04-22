export interface Video {
    id: string,
    url: string,
    publishedAt: Date,
    title: string,
    thumbnail: string,
    duration: string,
    viewCount: number,
    likeCount: number,
    favoriteCount: number,
    commentCount: number,
    isHighlighted: boolean,
    channel: Channel,
    category: Category
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