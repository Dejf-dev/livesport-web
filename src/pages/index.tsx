import * as React from "react"
import {NextPage} from "next";
import {Searcher} from "@/components/searcher";
import {SportTypes} from "@/components/sportTypes";
import EntityService from "@/services/EntityService";
import {EntitiesBySport, Entity, EntityMainData} from "@/types/customTypes";
import {useState} from "react";
import {EntityTable} from "@/components/entityTable";
import {DEFAULT_QUERY, DEFAULT_SPORTS_IDS, DEFAULT_TYPE_IDS} from "@/constants/queryParam";
import {Loading} from "@/components/loading";

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
    const [isLoading, setIsLoading] = useState(false)

    const fetchNewData = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()

        let data;

        try {
            const response = await entityService.fetchData(sportIds, typeIds, query)
            data = response.data
        } catch(err) {
            throw err
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
                      isLoading={isLoading} setIsLoading={setIsLoading}/>
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