import * as React from "react"
import {NextPage} from "next";
import {Searcher} from "@/components/searcher";
import {SportTypes} from "@/components/sportTypes";
import EntityService from "@/services/EntityService";
import {EntitiesBySport, Entity, EntityMainData} from "@/types/customTypes";
import {Table, TableRow, TableBody, TableCell} from "@/components/ui/table";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";

type Props = {
    entitiesBySport: EntitiesBySport[];
}

export const getServerSideProps = async () => {
    const entityService = new EntityService()
    const defSportsIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const defTypeIds = [1, 2, 3, 4]
    const defQuery = "dj"
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
    const entityService = new EntityService()

    return (
        <div className="w-full">
            <Searcher idxTypeEnt={-1}/>
            <SportTypes/>

            <Card className="bg-background text-foreground border-2 rounded-2xl w-3/4 mx-auto mb-10">
                <CardContent>
                    <Table>
                        <TableBody>
                            {
                                entitiesBySport.map((entBySport, index) => {


                                    return (
                                        <>
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
                                                entBySport.entities.map((entity, entIndex) => (
                                                    <TableRow key={`${index}-${entIndex}`}>
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
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home