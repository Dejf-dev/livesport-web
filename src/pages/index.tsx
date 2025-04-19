import * as React from "react"
import {NextPage} from "next";
import {Searcher} from "@/components/searcher";
import {SportTypes} from "@/components/sportTypes";
import EntityService from "@/services/EntityService";
import {EntitiesBySport, Entity, EntityMainData} from "@/types/customTypes";
import {Table, TableRow, TableBody, TableCell} from "@/components/ui/table";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {useState} from "react";
import {EntityTable} from "@/components/entityTable";

type Props = {
    entitiesBySport: EntitiesBySport[];
}

export const getServerSideProps = async () => {
    const defSportsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const defTypeIds = [1, 2, 3, 4]
    const defQuery = "dj"
    const entityService = new EntityService()
    let data;

    try {
        const response = await entityService.fetchData(defSportsIds, defTypeIds, defQuery)
        data = response.data
    } catch {
        return {
            notFound: true,
        }
    }

    const modData: EntityMainData[] = data.map((entity: Entity) => entityService.getMainData(entity))
    const result: EntitiesBySport[] = entityService.findAvailableSports(modData)

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
            <Searcher setTypeIds={setTypeIds} setQuery={setQuery} fetchNewData={fetchNewData} query={query}/>
            <SportTypes sportIds={sportIds} setSportIds={setSportIds}/>

            <EntityTable entities={entities} />
        </div>
    )
}

export default Home