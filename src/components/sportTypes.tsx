import {FC, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";

// todo, change dynamically with fetching all sports
const sports = ["Fotbal", "Tenis", "Basketball", "Hokej", "Americký fotbal", "Baseball", "Házená", "Rugby", "Florbal"];

export const SportTypes: FC = () => {
    const [idxPickedSport, setIdxPickedSport] = useState(-1)

    return (
        <div className="flex w-full justify-center gap-10 my-10">
            {
                sports.map((sport, index) => (
                    <Card key={index} className={`bg-background text-foreground border-2 rounded-2xl hover:bg-foreground 
                                                  hover:text-background w-fit h-4 flex items-center justify-center`}>
                        <CardContent>
                            { sport }
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}