import {FC} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import Image from "next/image";
import * as React from "react";
import {EntitiesBySport} from "@/types/customTypes";
import EntityService from "@/services/EntityService";
import {useRouter} from "next/router";

type Props = {
    entities: EntitiesBySport[]
}

export const EntityTable: FC<Props> = ({entities}: Props) => {
    const entityService = new EntityService();
    const router = useRouter();

    return (
        <Card className="bg-background text-foreground border-2 rounded-2xl w-3/4 mx-auto mb-10">
            <CardContent>
                <Table>
                    <TableBody>
                        {
                            entities.map((entBySport, index) => (
                                    <React.Fragment key={`sport-group-${index}`}>
                                        <TableRow className="hover:bg-transparent focus:bg-transparent active:bg-transparent cursor-default">
                                            <TableCell colSpan={4} className="px-0 py-5">
                                                <Card className="bg-sport-bar-background border-2 rounded-2xl text-foreground w-full">
                                                    <CardContent className="font-bold text-2xl">
                                                        {entBySport.sport}
                                                    </CardContent>
                                                </Card>
                                            </TableCell>
                                        </TableRow>
                                        {
                                            entBySport.entities.map(entity => (
                                                <TableRow key={`entity-${entity.id}`}
                                                          onClick={() =>
                                                              router.push(`/detail/${entityService.getTypeEntityPath(entity.typeId)}/${entity.url}/${entity.id}`)}
                                                          className="hover:cursor-pointer">
                                                    <TableCell className="text-left">
                                                        <div className="flex items-center gap-3">
                                                            <Card className="w-[60px] h-[60px] flex-shrink-0">
                                                                <CardContent className="p-0 w-full h-full flex items-center justify-center">
                                                                    <Image
                                                                        src={entity.imagePath === null
                                                                            ? entityService.getPlaceholderImage(entity.typeId)
                                                                            : process.env.NEXT_PUBLIC_IMAGE_DATA_URL + entity.imagePath}
                                                                        alt="Entity image"
                                                                        width={50}
                                                                        height={50}
                                                                        className="object-contain"
                                                                    />
                                                                </CardContent>
                                                            </Card>
                                                            <p>{entity.name}</p>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Image src={`${process.env.NEXT_PUBLIC_IMAGE_DATA_URL}${entity.country.path}`}
                                                                   alt="Country image"
                                                                   width={40}
                                                                   height={40}
                                                            />
                                                            <p>{entity.country.name}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{entity.team ?? ""}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </React.Fragment>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}