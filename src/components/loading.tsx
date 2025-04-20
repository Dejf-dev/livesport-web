import {FC} from "react";
import Image from "next/image";

export const Loading: FC = () => {

    return (
        <Image src="/loading-svgrepo-com-white.svg"
               alt="Reload icon"
               width={100}
               height={100}
               className="spin-custom"
        />
    )
}