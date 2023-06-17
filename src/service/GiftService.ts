import { Gift, GiftBrand, GiftCategory } from "../data/model/Gift";
import { Result } from "../data/model/Result";
import parseResponse from "./ResponseParse";
import api from './ApiClient';
import { parseDateToIso } from "../util/DateUtil";

class GiftService {
    async getGifts(
        page: number = 1,
        pageSize: number = 5
    ): Promise<Result<Array<Gift>>> {
        return parseResponse(await api.get('v1/gifts', {
            params: {
                page,
                pageSize
            }
        }))
    }

    async getGift(giftId: number): Promise<Result<Gift>> {
        return parseResponse(await api.get(`v1/gifts/${giftId}`))
    }

    async createGift(name: string, description: string,
        image: File, codes: string[],
        startTime: Date,
        endTime: Date,
        categoryId: number,
        brandId: number,
        price: number
    ) {
        return parseResponse(await api.post('v1/gifts', {
            image: image,
            name: name,
            startTime,
            endTime,
            description,
            categoryId,
            brandId,
            price
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async updateGift(id: number, 
        image: Nullable<File>, 
        name?: string,
        description?: string,
        startTime?: Date,
        endTime?: Date,
        price?: number,
        ) {
        return parseResponse(await api.patch(`v1/gifts/${id}`, {
            image: image,
            name: name,
            startTime: startTime && parseDateToIso(startTime) ,
            endTime: endTime && parseDateToIso(endTime),
            description,
            price
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async deleteGift(giftId: number) {
        return parseResponse(await api.delete(`v1/gifts/${giftId}`))
    }


    async fetchBrands(page: number = 1, pageSize: number = 10): Promise<Result<Array<GiftBrand>>> {
        return parseResponse(await api.get('v1/gifts/brands'))
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

    async updateBrand(id: number, image: Nullable<File>, name: Nullable<string>) {
        return parseResponse(await api.patch(`v1/gifts/brands/${id}`, {
            image: image,
            name: name
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }))
    }

    async fetchCategories(): Promise<Result<Array<GiftCategory>>> {
        return parseResponse(await api.get('v1/gifts/categories'))
    }

    async getCategories(): Promise<Array<GiftCategory>> {
        const cached = localStorage.getItem('categories')
        if (cached) {
            return JSON.parse(cached) as Array<GiftCategory>
        }
        const res = await this.fetchCategories();
        const resCategories = res.getValue()
        if (resCategories != null) {
            localStorage.setItem('categories', JSON.stringify(resCategories))
            return resCategories;
        }
        return [];
    }

}

const giftService = new GiftService();
export default giftService;