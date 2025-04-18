import {
    LANG_ID,
    PROJECT_ID,
    PROJECT_TYPE_ID,
    SPORT_IDS,
    TYPE_IDS,
    QUERY
} from "@/constants/QueryParamNames"
import axios, {AxiosResponse} from "axios";
import {Entity, MainData} from "@/types/customTypes";

export default class EntityService {
    private urlMandQueryParams = `${process.env.NEXT_PUBLIC_API_URL}?` +
                                        `${LANG_ID}=${process.env.NEXT_PUBLIC_LANG_ID}&` +
                                        `${PROJECT_ID}=${process.env.NEXT_PUBLIC_PROJECT_ID}&` +
                                        `${PROJECT_TYPE_ID}=${process.env.NEXT_PUBLIC_PROJECT_TYPE_ID}`

    public fetchData = async (sportIds: number[], typeIds: number[], q: string): Promise<AxiosResponse> => {
        const sportIdsQueryParam = sportIds.join(",")
        const typeIdsQueryParam = typeIds.join(",")

        const finalUrl = `${this.urlMandQueryParams}&` +
                                `${SPORT_IDS}=${sportIdsQueryParam}&` +
                                `${TYPE_IDS}=${typeIdsQueryParam}&` +
                                `${QUERY}=${q}`

        return await axios.get(`${finalUrl}`);
    }

    public getMainData = (entity: Entity): MainData => {
        return {
            name: entity.name,
            sport: entity.sport.name,
            country: entity.defaultCountry.name,
            imagePath: entity.images.length > 0 ? entity.images[0].path : null
        }
    }
}