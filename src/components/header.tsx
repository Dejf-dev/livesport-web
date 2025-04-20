import {FC, useEffect, useState} from "react";
import Image from "next/image";
import * as React from "react";
import {usePathname} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

export const Header: FC = () => {
    const pathname = usePathname();
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (pathname === "/") {
            setTitle("Results");
        } else {
            const pathParts = pathname.split("/").filter(Boolean);
            const firstSegment = pathParts[0]?.charAt(0).toUpperCase() + pathParts[0]?.slice(1);
            setTitle(firstSegment || "");
        }
    }, [pathname]);

    return (
        <div className="bg-header-background mb-7">
            <div className="w-full flex items-center relative mb-3">
                <Link className="h-full flex items-center" href="/">
                    <Image src="/livesport-logo.jpg" alt="Livesport logo" width={100} height={100}/>
                    <h1 className="text-6xl">Livesport</h1>
                </Link>
                <h2 className="text-5xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{title}</h2>
            </div>
            <Separator />
        </div>
    )
}