import { Result } from "../data/model/Result";
import parseResponse from "./ResponseParse";
import api from './ApiClient';
import { Banner, CreateBannerPayload, UpdateBannerPayload } from "../data/model/BannerModels";
import { parseDateToIso } from "../util/DateUtil";


const urlPath = 'v1/banners';


class BannerService {

    async getBanners(
        query: string = '',
        page: number = 1,
        pageSize: number = 5
    ): Promise<Result<Array<Banner>>> {
        return parseResponse(await api.get(urlPath, {
            params: {
                name: query,
                page,
                pageSize
            }
        }))
    }

    async createBanner(req: CreateBannerPayload) {
        return parseResponse(await api.put(urlPath, {
            image: req.image,
            title: req.title,
            content: req.content,
            startTime: req.startTime && parseDateToIso(req.startTime),
            endTime: req.endTime && parseDateToIso(req.endTime),
            description: req.description,
            isActive: req.isActive,
            priority: req.priority,
            action: req.action
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async updateBanner(req: UpdateBannerPayload) {
        return parseResponse(await api.put(urlPath, {
            id: req.id,
            image: req.image,
            title: req.title,
            content: req.content,
            startTime: req.startTime && parseDateToIso(req.startTime),
            endTime: req.endTime && parseDateToIso(req.endTime),
            description: req.description,
            isActive: req.isActive,
            priority: req.priority,
            action: req.action
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async deleteBanner(
        bannerId: number
    ) {
        return parseResponse(await api.delete(`${urlPath}/${bannerId}`))
    }
}
const bannerService = new BannerService();
export default bannerService;