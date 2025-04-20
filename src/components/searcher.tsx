import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import * as React from "react";

type Props = {
    setTypeIds: Dispatch<SetStateAction<number[]>>
    setQuery: Dispatch<SetStateAction<string>>
    fetchNewData: (event: React.FormEvent) => Promise<void>
    query: string
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const typeEntities = ["all types", "competitions only", "participants only"]

export const Searcher: FC<Props> = ({setTypeIds, setQuery, fetchNewData, query, isLoading, setIsLoading}: Props) => {
    const [idxChosenTypeEnt, setIdxChosenTypeEnt] = useState<number>(-1)

    useEffect(() => {
        switch (idxChosenTypeEnt) {
            case 0: {
                setTypeIds([1, 2, 3, 4])
                break
            }
            case 1: {
                setTypeIds([1])
                break
            }
            case 2: {
                setTypeIds([2, 3, 4])
                break
            }
            default: setTypeIds([])
        }
    }, [idxChosenTypeEnt, setTypeIds])

    return (
        <div className="w-full flex items-center justify-center gap-5">
            <input
                placeholder="Enter search text..."
                className="max-w-md border-2 rounded-2xl p-5 h-5"
                onChange={event => setQuery(event.target.value)}
                value={query}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-2 rounded-2xl p-5">
                        Entity type <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {
                        typeEntities.map((type, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                className="capitalize"
                                checked={idxChosenTypeEnt === index}
                                onClick={() => setIdxChosenTypeEnt(index)}>
                                {type}
                            </DropdownMenuCheckboxItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <Button type="submit" variant="outline"
                    className="border-2 rounded-2xl p-5 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={async (event) => {
                setIsLoading(true)
                setIdxChosenTypeEnt(-1)
                await fetchNewData(event)
                setIsLoading(false)
            }
            }>
                Hledat
            </Button>
        </div>

    )
}