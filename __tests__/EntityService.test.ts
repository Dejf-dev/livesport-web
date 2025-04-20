import axios from "axios";
import EntityService from "@/services/EntityService";
import {LANG_ID, PROJECT_ID, PROJECT_TYPE_ID, QUERY, SPORT_IDS, TYPE_IDS} from "@/constants/queryParam";

describe("EntityService", () => {
    const service = new EntityService();

    const sportIds = [1, 2]
    const typeIds = [3, 4]
    const q = "roger";

    const urlMandQueryParams = `${process.env.NEXT_PUBLIC_API_URL}?` +
        `${LANG_ID}=${process.env.NEXT_PUBLIC_LANG_ID}&` +
        `${PROJECT_ID}=${process.env.NEXT_PUBLIC_PROJECT_ID}&` +
        `${PROJECT_TYPE_ID}=${process.env.NEXT_PUBLIC_PROJECT_TYPE_ID}`


    afterEach(() => {
        jest.clearAllMocks()
    });

    it("fetches data successfully with correct URL and status 200", async () => {
        const spy = jest.spyOn(axios, "get")
        const response = await service.fetchData(sportIds, typeIds, q)


        expect(spy).toHaveBeenCalledTimes(1)
        expect(response.status).toBe(200)
        expect(response.data).toBeDefined()
        const calledUrl = response.config.url;
        expect(calledUrl).toContain(`sport-ids=${sportIds.join(",")}`)
        expect(calledUrl).toContain(`type-ids=${typeIds.join(",")}`)
        expect(calledUrl).toContain(`q=${q}`)
    });

    it("returns 422 if a required value for query param is missing - q", async () => {
        const spy = jest.spyOn(axios, "get");

        try {
            await service.fetchData(sportIds, typeIds, "");
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(422)
            expect(error.response.data.code).toStrictEqual(100)
        }
    });

    it("returns 422 if a required value for query param is missing - sport-ids", async () => {
        const spy = jest.spyOn(axios, "get");

        try {
            await service.fetchData([], typeIds, q);
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(422)
            expect(error.response.data.code).toStrictEqual(100)
        }
    });

    it("returns 422 if a required value for query param is missing - type-ids", async () => {
        const spy = jest.spyOn(axios, "get");

        try {
            await service.fetchData(sportIds, [], q);
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(422)
            expect(error.response.data.code).toStrictEqual(100)
        }
    });

    it("returns 400 if a required query param is missing - q", async () => {
        const spy = jest.spyOn(axios, "get");
        const sportIdsQueryParam = sportIds.join(",")
        const typeIdsQueryParam = typeIds.join(",")

        const urlWithMissQueryParam = `${urlMandQueryParams}&` +
            `${SPORT_IDS}=${sportIdsQueryParam}&` +
            `${TYPE_IDS}=${typeIdsQueryParam}`

        try {
            await axios.get(`${urlWithMissQueryParam}`);
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(400)
            expect(error.response.data.code).toStrictEqual(101)
        }
    });

    it("returns 400 if a required query param is missing - type-ids", async () => {
        const spy = jest.spyOn(axios, "get");
        const sportIdsQueryParam = sportIds.join(",")

        const urlWithMissQueryParam = `${urlMandQueryParams}&` +
            `${SPORT_IDS}=${sportIdsQueryParam}&` +
            `${QUERY}=${q}`

        try {
            await axios.get(`${urlWithMissQueryParam}`);
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(400)
            expect(error.response.data.code).toStrictEqual(101)
        }
    });

    it("returns 400 if a required query param is missing - sport-ids", async () => {
        const spy = jest.spyOn(axios, "get");
        const typeIdsQueryParam = typeIds.join(",")
        const urlWithMissQueryParam = `${urlMandQueryParams}&` +
            `${TYPE_IDS}=${typeIdsQueryParam}&` +
            `${QUERY}=${q}`

        try {
            await axios.get(`${urlWithMissQueryParam}`);
        } catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1)
            expect(error.response.status).toBe(400)
            expect(error.response.data.code).toStrictEqual(101)
        }
    });
});
