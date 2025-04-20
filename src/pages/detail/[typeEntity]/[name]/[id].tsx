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
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import * as React from "react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

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
    const entityService = new EntityService()

    const replaceEwithA = (str: string) => str.replaceAll("e", "a")
    const replaceTypeIdForPos = (typeId: number) => {
        if (typeId === 1) {
            return "Tournament"
        } else if (typeId === 2) {
            return "Team"
        }

        return "Player"
    }


    return (
        <Card className="bg-sport-bar-background text-foreground border-2 rounded-2xl min-w-1/2 max-w-fit mx-auto mt-30">
            <CardContent className="space-y-6">
                <div className="w-full flex items-center gap-10">
                    <Avatar className="w-[120px] h-[120px] bg-foreground border-4 border-sport-bar-foreground">
                        <AvatarImage src={entityInfo.images.length === 0
                            ? entityService.getPlaceholderImage(entityInfo.typeId)
                            : process.env.NEXT_PUBLIC_IMAGE_DATA_URL + entityInfo.images[0].path}/>
                    </Avatar>
                    <div className="space-y-2">
                        <h3 className="font-bold text-5xl">{entityInfo.name}</h3>
                        <div>
                            <p className="text-sport-bar-foreground"><b>Gender:</b> {replaceEwithA(entityInfo.gender)}
                            </p>
                            <p className="text-sport-bar-foreground"><b>Sport:</b> {entityInfo.sport}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-evenly gap-10">
                    <Card
                        className="text-sport-bar-foreground bg-header-background border-2 rounded-2xl border-sport-bar-foreground">
                        <CardContent>
                            <div className="text-center space-y-1">
                                <h4 className="text-foreground text-xl"><b>{replaceTypeIdForPos(entityInfo.typeId)}</b>
                                </h4>
                                <p className="text-sm">Role</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card
                        className="text-sport-bar-foreground bg-header-background border-2 rounded-2xl border-sport-bar-foreground">
                        <CardContent>
                            <div className="text-center space-y-1">
                                <div className="flex gap-4 items-center">
                                    <h4 className="text-foreground text-xl"><b>{entityInfo.countryName}</b></h4>
                                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_DATA_URL}${entityInfo.countryImages[0].path}`}
                                           alt="Country image"
                                           width={40}
                                           height={40}
                                    />
                                </div>
                                <p className="text-sm">Nationality</p>
                            </div>
                        </CardContent>
                    </Card>
                    {entityInfo.participant &&
                        <Card
                            className="text-sport-bar-foreground bg-header-background border-2 rounded-2xl border-sport-bar-foreground">
                            <CardContent>
                                <div className="text-center space-y-1">
                                    <h4 className="text-foreground text-xl"><b>{entityInfo.participant}</b></h4>
                                    <p className="text-sm">Position</p>
                                </div>
                            </CardContent>
                        </Card>
                    }
                    {entityInfo.teams && entityInfo.teams.length !== 0 &&
                        <Card
                            className="text-sport-bar-foreground bg-header-background border-2 rounded-2xl border-sport-bar-foreground">
                            <CardContent>
                                <div className="text-center space-y-1">
                                    <h4 className="text-foreground text-xl"><b>{entityInfo.teams?.join(", ")}</b></h4>
                                    <p className="text-sm">Team</p>
                                </div>
                            </CardContent>
                        </Card>
                    }
                    {entityInfo.superTemplateName &&
                        <Card
                            className="text-sport-bar-foreground bg-header-background border-2 rounded-2xl border-sport-bar-foreground">
                            <CardContent>
                                <div className="text-center space-y-1">
                                    <h4 className="text-foreground text-xl"><b>{entityInfo.superTemplateName}</b></h4>
                                    <p className="text-sm">Tournament format</p>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default DetailPage