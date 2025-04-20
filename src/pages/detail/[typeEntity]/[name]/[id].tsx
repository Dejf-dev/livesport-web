import {GetServerSidePropsContext, NextPage} from "next";
import {
    INDIVIDUAL_PLAYER,
    INDIVIDUAL_PLAYER_ID,
    PLAYER_IN_TEAM, PLAYER_IN_TEAM_ID,
    TEAM,
    TEAM_ID,
    TOURNAMENT,
    TOURNAMENT_ID
} from "@/constants/typeConstants";
import EntityService from "@/services/EntityService";
import {DEFAULT_SPORTS_IDS} from "@/constants/queryParam";
import {Entity, EntityAllData} from "@/types/customTypes";
import * as React from "react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Loading} from "@/components/loading";
import {EntityCard} from "@/components/entityCard";

type Props = {
    entityInfo: EntityAllData
}

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
    const {typeEntity, name, id} = params

    if (typeof typeEntity !== "string"
        || ![TOURNAMENT, TEAM, INDIVIDUAL_PLAYER, PLAYER_IN_TEAM].includes(typeEntity)
        || typeof name !== "string"
        || name?.length < 2
        || typeof id !== "string") {
        return {
            notFound: true
        }
    }

    let data
    const entityService = new EntityService()
    let typeEntityId: number

    //decides what type of entity
    switch (typeEntity) {
        case TOURNAMENT: {
            typeEntityId = TOURNAMENT_ID
            break
        }
        case TEAM: {
            typeEntityId = TEAM_ID
            break
        }
        case INDIVIDUAL_PLAYER: {
            typeEntityId = INDIVIDUAL_PLAYER_ID
            break
        }
        default: {
            typeEntityId = PLAYER_IN_TEAM_ID
        }
    }

    try {
        const response = await entityService.fetchData(DEFAULT_SPORTS_IDS, [typeEntityId], name)
        data = response.data as Entity[]
    } catch {
        return {
            notFound: true,
        }
    }

    const entityArr = data.filter(entity => entity.id === id)

    // should get one result
    if (entityArr.length !== 1) {
        return {
            notFound: true,
        }
    }

    const entity = entityArr[0]

    const modifiedEntity = entityService.getAllData(entity)

    return {
        props: {
            entityInfo: modifiedEntity
        }
    }
}

const DetailPage: NextPage<Props> = ({entityInfo}: Props) => {
    const router = useRouter()
    const [isPageLoading, setIsPageLoading] = useState(false)

    useEffect(() => {
        const handleStart = () => setIsPageLoading(true)
        const handleStop = () => setIsPageLoading(false)

        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleStop)
        router.events.on("routeChangeError", handleStop)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleStop)
            router.events.off("routeChangeError", handleStop)
        }
    }, [router])

    if (isPageLoading) {
        return (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit w-fit">
                <Loading />
            </div>
        )
    }


    return (
        <>
            {
                isPageLoading ? <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-fit w-fit">
                        <Loading />
                    </div>
                    :
                    <EntityCard entityInfo={entityInfo} />
            }
        </>
    )
}

export default DetailPage