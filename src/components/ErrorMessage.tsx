import {FC} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";

type Props = {
    mainText: string
    descText: string
    is404: boolean
    buttonText: string
}


export const ErrorMessage: FC<Props> = ({mainText, descText, is404, buttonText}: Props) => {
    const router = useRouter()

    return (
        <Card className="bg-sport-bar-background text-foreground border-2 w-1/2 mx-auto mt-30">
            <CardContent className="flex flex-col items-center justify-center text-foreground">
                <h1 className="text-4xl font-bold mb-4">{mainText}</h1>
                <p className="mb-6">{descText}</p>
                <Button type="submit" variant="outline"
                        className="bg-foreground text-background hover:bg-background hover:text-foreground border-2 rounded-2xl p-5 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={is404 ? () => router.push("/") : () => location.reload()}
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    )
}