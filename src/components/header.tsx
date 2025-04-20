import {FC} from "react";
import Image from "next/image";
import * as React from "react";
import {usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

export const Header: FC = () => {
    const pathname = usePathname();

    const makeTitle = () => {
        if (pathname == "/") {
            return "Results"
        }

        return pathname.split("/").filter(Boolean).map(part => part.charAt(0).toUpperCase() + part.slice(1))[0];
    }

    return (
        <div className="bg-header-background mb-7">
            <div className="w-full flex items-center relative mb-3">
                <Link className="h-full flex items-center" href="/">
                    <Image src="/livesport-logo.jpg" alt="Livesport logo" width={100} height={100}/>
                    <h1 className="text-6xl">Livesport</h1>
                </Link>
                <h2 className="text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{makeTitle()}</h2>
            </div>
            <Separator />
        </div>
    )
}