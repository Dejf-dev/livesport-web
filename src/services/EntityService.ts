import {LANG_ID, PROJECT_ID, PROJECT_TYPE_ID, QUERY, SPORT_IDS, TYPE_IDS} from "@/constants/queryParam"
import axios, {AxiosResponse} from "axios";
import {EntitiesBySport, Entity, EntityAllData, EntityMainData} from "@/types/customTypes";
import {TEAM_ID, TOURNAMENT_ID} from "@/constants/typeConstants";

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

    public getMainData = (entity: Entity): EntityMainData => {
        return {
            id: entity.id,
            name: entity.name,
            typeId: entity.type.id,
            sportId: entity.sport.id,
            sport: entity.sport.name,
            imagePath: entity.images.length > 0 ? entity.images[0].path : null,
            country: {
                name: entity.defaultCountry.name,
                variantTypeId: entity.defaultCountry.images[0].variantTypeId,
                path: entity.defaultCountry.images[0].path
            },
            team: entity.teams?.find(team => team.kind === "TEAM")?.name ?? null
        }
    }

    public getAllData = (entity: Entity): EntityAllData => {
        return {
            gender: entity.gender.name,
            name: entity.name,
            typeId: entity.type.id,
            participant: entity.participantTypes?.[1]?.name ?? null,
            sport: entity.sport.name,
            countryName: entity.defaultCountry.name,
            countryImages: entity.defaultCountry.images.map(image => ({
                path: image.path,
                variantTypeId: image.variantTypeId
            })),
            images: entity.images.map(image => ({
                path: image.path,
                variantTypeId: image.variantTypeId
            })),
            teams: entity.teams?.map(team => team.name) ?? null,
            superTemplateName: entity.superTemplate?.name ?? null
        }
    }

    public getPlaceholderImage = (typeId: number): string => {
        switch (typeId) {
            case TOURNAMENT_ID: return "/champions-cup-svgrepo-com.svg"
            case TEAM_ID: return "/team-3-svgrepo-com.svg"
            default: return "/person-svgrepo-com.svg"
        }
    }

    public findAvailableSports = (entities: EntityMainData[]): EntitiesBySport[] => {
        const sportMap = new Map<string, { sportId: number, entities: EntityMainData[] }>();

        // inserting entities to sports
        for (const entity of entities) {
            if (!sportMap.has(entity.sport)) {
                sportMap.set(entity.sport, {
                    sportId: entity.sportId,
                    entities: []
                })
            }

            sportMap.get(entity.sport)!.entities.push(entity)
        }

        // sort by sportId
        const sortedEntries = Array.from(sportMap.entries()).sort(
            ([, a], [, b]) => a.sportId - b.sportId
        );

        // build final result
        return sortedEntries.map(([sportName, {entities}]) => ({
            sport: sportName,
            entities
        }))
    }
}