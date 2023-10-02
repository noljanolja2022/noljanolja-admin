import { Result } from '../data/model/Result';
import { StickerPack } from '../data/model/StickerModels';
import { PromotedVideoConfig, Video } from '../data/model/VideoModels';
import api from './ApiClient';
import parseResponse from './ResponseParse';

class MediaService {

    async getStickerPacks(): Promise<Result<StickerPack[]>> {
        return parseResponse(await api.get('v1/media/sticker-packs'))
    }

    async createStickerPack(file: any): Promise<Result<any>> {
        return parseResponse(await api.post('v1/media/sticker-packs', {
            file: file
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async getStickerUrl(stickerPackId: number, name: string) {
        return api.get(`v1/media/sticker-packs/${stickerPackId}/${name}`, {
            responseType: 'arraybuffer'
        })
    }

    async importVideo(youtubeUrl: string, isHighlighted: boolean): Promise<Result<Video>> {
        return parseResponse(await api.post('v1/media/videos', {
            youtubeUrl,
            isHighlighted
        }))
    }

    async getVideoList(query: string = '', page: number = 1, pageSize: number = 5): Promise<Result<Array<Video>>> {
        return parseResponse(await api.get('v1/media/videos', {
            params: {
                page,
                pageSize,
                query
            }
        }))
    }

    async deleteVideo(videoId: string) {
        return parseResponse(await api.delete(`v1/media/videos/${videoId}`))
    }

    async getPromotedVideo() : Promise<Result<Array<PromotedVideoConfig>>>{
        return parseResponse(await api.get(`v1/media/videos/promoted`));
    }

    async promoteVideo(video: Video, interactionDelay: number, startDate: Date, endDate: Date,
        autoLike: boolean = true, autoPlay: boolean = true,
        autoComment: boolean = true, autoSubscribe: boolean = true) {
        return parseResponse(await api.post(`v1/media/videos/${video.id}/promoted`, {
            autoLike,
            autoPlay,
            autoComment,
            autoSubscribe,
            startDate,
            endDate,
            interactionDelay
        }),)
    }
}

const mediaService = new MediaService();
export default mediaService;