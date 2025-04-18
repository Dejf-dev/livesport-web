import {FC, useState} from "react";
import {Input} from "@/components/ui/input";
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
    idxTypeEnt: number
}

const typeEntities = ["všechny typy", "pouze soutěže", "pouze participanti"]

export const Searcher: FC<Props> = ({idxTypeEnt}: Props) => {
    const [idxChosenTypeEnt, setIdxChosenTypeEnt] = useState(idxTypeEnt)

    return (
        <div className="w-full flex items-center justify-center gap-5">
            <Input
                placeholder="Zadejte hledaný text..."
                className="max-w-md border-2 rounded-2xl p-5"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-2 rounded-2xl p-5">
                        Typ entity <ChevronDown />
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
            <Button variant="outline" className="border-2 rounded-2xl p-5 hover:cursor-pointer">Hledat</Button>
        </div>

    )
}