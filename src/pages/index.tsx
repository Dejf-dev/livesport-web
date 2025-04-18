import * as React from "react"
import {NextPage} from "next";
import {Searcher} from "@/components/searcher";
import {SportTypes} from "@/components/sportTypes";
import EntityService from "@/services/EntityService";
import {Entity, MainData} from "@/types/customTypes";

type Props = {
    mainData: MainData[];
}

export const getServerSideProps = async () => {
    const entityService = new EntityService()
    const defSportsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const defTypeIds = [1, 2, 3, 4]
    const defQuery = "dj"
    let data;


    try {
        const res = await entityService.fetchData(defSportsIds, defTypeIds, defQuery)
        data = res.data
    } catch {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            mainData: data.map((entity: Entity) => entityService.getMainData(entity))
        }
    }
}

const Home: NextPage<Props> = ({mainData}: Props) => {

    return (
        <div className="w-full">
            <Searcher idxTypeEnt={-1}/>
            <SportTypes/>


        </div>
    )
}

export default Home