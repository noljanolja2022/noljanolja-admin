import { Gift, GiftBrand, GiftCategory } from "../data/model/Gift";
import { Result } from "../data/model/Result";
import { parseDateToIso } from "../util/DateUtil";
import api from './ApiClient';
import parseResponse from "./ResponseParse";

class GiftService {
    async getGifts(
        query: string = '',
        isFeatured : boolean = false,
        isTodayOffer : boolean = false,
        isRecommended : boolean = false,
        page: number = 1,
        pageSize: number = 5
    ): Promise<Result<Array<Gift>>> {
        return parseResponse(await api.get('v1/gifts', {
            params: {
                query,
                isFeatured,
                isTodayOffer,
                isRecommended,
                page,
                pageSize
            }
        }))
    }

    async getGift(giftId: number): Promise<Result<Gift>> {
        return parseResponse(await api.get(`v1/gifts/${giftId}`))
    }

    async importGifts() {
        return parseResponse(await api.get(`v1/gifts/import`)) 
    }

    async createGift(name: string, description: string,
        image: File, codes: string[],
        startTime: Date,
        endTime: Date,
        categoryId: number,
        brandId: number,
        price: number,
    ) {
        return parseResponse(await api.post('v1/gifts', {
            image: image,
            name: name,
            startTime: startTime && parseDateToIso(startTime),
            endTime: endTime && parseDateToIso(endTime),
            description,
            categoryId,
            brandId,
            price,
            codes,
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async updateGift(
        id: string,
        price: number,
        isActive: boolean,
        categoryId?: number
    ) {
        return parseResponse(await api.patch(`v1/gifts/${id}`, {
            isActive,
            categoryId,
            price
        }))
    }

    async deleteGift(giftId: string) {
        return parseResponse(await api.delete(`v1/gifts/${giftId}`))
    }


    async fetchBrands(query: string = '', page: number = 1, pageSize: number = 5): Promise<Result<Array<GiftBrand>>> {
        return parseResponse(await api.get('v1/gifts/brands', {
            params: {
                query,
                page,
                pageSize
            }
        }))
    }


    async fetchCategories(query: string = '', page: number = 1, pageSize: number = 10): Promise<Result<Array<GiftCategory>>> {
        return parseResponse(await api.get('v1/gifts/categories', {
            params: {
                query,
                page,
                pageSize
            }
        }))
    }

    async updateCategory(payload: Partial<GiftCategory>): Promise<Result<GiftCategory>> {
        return parseResponse(await api.put(`v1/gifts/categories`, payload))
    }

    async createBrand(image: File, name: string) {
        return parseResponse(await api.post('v1/gifts/brands', {
            image,
            name
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async updateBrand(id: string, image: Nullable<File>, name: Nullable<string>) {
        return parseResponse(await api.patch(`v1/gifts/brands/${id}`, {
            image: image,
            name: name
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }
}

const giftService = new GiftService();
export default giftService;