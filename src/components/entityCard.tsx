import {FC} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import * as React from "react";
import {EntityAllData} from "@/types/customTypes";
import EntityService from "@/services/EntityService";

type Props = {
    entityInfo: EntityAllData
}

export const EntityCard: FC<Props> = ({entityInfo}: Props) => {
    const entityService = new EntityService();

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
                        <AvatarImage src={entityInfo.imagePath === null
                            ? entityService.getPlaceholderImage(entityInfo.typeId)
                            : process.env.NEXT_PUBLIC_IMAGE_DATA_URL + entityInfo.imagePath}
                        />
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
                                    <p className="text-sm">Teams</p>
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