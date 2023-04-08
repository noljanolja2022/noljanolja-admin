import { Result } from '../data/model/Result';
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
}

const mediaService = new MediaService();
export default mediaService;