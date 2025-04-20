import {Dispatch, FC, SetStateAction} from "react";
import {Card, CardContent} from "@/components/ui/card";

type Props = {
    sportIds: number[]
    setSportIds: Dispatch<SetStateAction<number[]>>
}

// todo, change dynamically with fetching all sports
const sports = ["Soccer", "Tennis", "Basketball", "Hockey", "American football", "Baseball", "Handball", "Rugby Union", "Floorball"];

export const SportTypes: FC<Props> = ({sportIds, setSportIds}: Props) => {

    return (
        <div className="flex w-full justify-center gap-10 my-10">
            {
                sports.map((sport, index) => (
                    <Card key={index} className={`text-foreground border-2 rounded-2xl hover:bg-foreground 
                                                  hover:text-background w-fit h-4 flex items-center justify-center 
                                                  hover:cursor-pointer ${sportIds.includes(index + 1) ? `bg-red-500` : `bg-background`}`}
                          onClick={() => {
                              if (!sportIds.includes(index + 1)) {
                                  setSportIds(prevSportIds => [...prevSportIds, index + 1])
                              }
                              else {
                                  setSportIds(prevSportIds => prevSportIds.filter(typeId => typeId !== index + 1))
                              }
                          }}
                    >
                        <CardContent>
                            { sport }
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}