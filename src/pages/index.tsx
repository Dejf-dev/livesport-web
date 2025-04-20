import * as React from "react"
import {NextPage} from "next";
import {Searcher} from "@/components/searcher";
import {SportTypes} from "@/components/sportTypes";
import EntityService from "@/services/EntityService";
import {EntitiesBySport, Entity, EntityMainData} from "@/types/customTypes";
import {useEffect, useState} from "react";
import {EntityTable} from "@/components/entityTable";
import {DEFAULT_QUERY, DEFAULT_SPORTS_IDS, DEFAULT_TYPE_IDS} from "@/constants/queryParam";
import {Loading} from "@/components/loading";
import {NO_SPORT_ID_ERROR, NO_TYPE_ID_ERROR, SHORT_QUERY_ERROR} from "@/constants/errorMessages";

type Props = {
    entitiesBySport: EntitiesBySport[];
}

export const getServerSideProps = async () => {
    const entityService = new EntityService()
    let data;

    try {
        const response = await entityService.fetchData(DEFAULT_SPORTS_IDS, DEFAULT_TYPE_IDS, DEFAULT_QUERY)
        data = response.data
    } catch {
        return {
            notFound: true,
        }
    }

    const modifiedData: EntityMainData[] = data.map((entity: Entity) => entityService.getMainData(entity))
    const result: EntitiesBySport[] = entityService.findAvailableSports(modifiedData)

    return {
        props: {
            entitiesBySport: result
        }
    }
}

const Home: NextPage<Props> = ({entitiesBySport}: Props) => {
    const [sportIds, setSportIds] = useState<number[]>([])
    const [typeIds, setTypeIds] = useState<number[]>([])
    const [query, setQuery] = useState<string>("")
    const [entities, setEntities] = useState<EntitiesBySport[]>(entitiesBySport)
    const entityService = new EntityService()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")


    // Auto-dismiss error after 3 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const fetchNewData = async (event: React.FormEvent): Promise<void> => {
        let errorMessage = ""
        event.preventDefault()

        setError("")

        // checking invalid query parameters
        if (sportIds.length === 0) {
            errorMessage += NO_SPORT_ID_ERROR + "\n"
        }
        if (typeIds.length === 0) {
            errorMessage += NO_TYPE_ID_ERROR + "\n"
        }
        if (query === "") {
            errorMessage += SHORT_QUERY_ERROR;
        }

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        let data;

        try {
            const response = await entityService.fetchData(sportIds, typeIds, query)
            data = response.data
        } catch {
            setError("An error occurred while fetching the data. Please try again.");
            return
        }

        const modData: EntityMainData[] = data.map((entity: Entity) => entityService.getMainData(entity))
        const result: EntitiesBySport[] = entityService.findAvailableSports(modData)

        setSportIds([])
        setTypeIds([])
        setQuery("")

        setEntities(result)
    }

    return (
        <div className="w-full">
            <Searcher setTypeIds={setTypeIds} setQuery={setQuery} fetchNewData={fetchNewData} query={query}
                      isLoading={isLoading} setIsLoading={setIsLoading} error={error}/>
            <SportTypes sportIds={sportIds} setSportIds={setSportIds}/>
            {
                isLoading ?
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit w-fit">
                        <Loading />
                    </div>
                    :
                    <EntityTable entities={entities} />
            }
        </div>
    )
}

export default Home