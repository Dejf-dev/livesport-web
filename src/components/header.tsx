import {FC, useEffect, useState} from "react";
import Image from "next/image";
import * as React from "react";
import {usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

type Props = {
    isErrorPage: boolean;
}

export const Header: FC<Props> = ({isErrorPage}: Props) => {
    const pathname = usePathname();
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (isErrorPage) {
          setTitle("Error");
        }
        else if (pathname === "/") {
            setTitle("Results");
        } else {
            const pathParts = pathname.split("/").filter(Boolean);
            const firstSegment = pathParts[0]?.charAt(0).toUpperCase() + pathParts[0]?.slice(1);
            setTitle(firstSegment || "");
        }
    }, [isErrorPage, pathname]);

    return (
        <div className="bg-header-background mb-7 w-full">
            <div className="w-full flex flex-row max-lg:flex-col items-center mb-3 lg:mx-auto">
                <Link className="h-full flex items-center" href="/">
                    <Image src="/livesport-logo.jpg" alt="Livesport logo" width={100} height={100}/>
                    <h1 className="text-6xl">Livesport</h1>
                </Link>
                <h2 className="text-5xl lg:absolute lg:left-1/2 lg:-translate-x-1/2">{title}</h2>
            </div>
            <Separator />
        </div>
    )
}