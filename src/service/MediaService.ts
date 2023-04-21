import { Result } from '../data/model/Result';
import { Video } from '../data/model/VideoModels';
import api from './ApiClient';
import parseResponse from './ResponseParse';

class MediaService {
    async createStickerPack(file: any): Promise<Result<any>> {
        return parseResponse(await api.post('v1/media/sticker-packs', {
            file: file
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async importVideo(youtubeUrl: string, isHighlighted: boolean): Promise<Result<Video>> {
        return parseResponse(await api.post('v1/media/videos', {
            youtubeUrl,
            isHighlighted
        }))
    }

    async getVideoList(page: number = 1, pageSize: number = 10): Promise<Result<Array<Video>>> {
        return parseResponse(await api.get('v1/media/videos', {
            params: {
                page,
                pageSize
            }
        }))
    }

    async deleteVideo(videoId: string) {
        return parseResponse(await api.delete(`v1/media/videos/${videoId}`))
    }
}

const mediaService = new MediaService();
export default mediaService;