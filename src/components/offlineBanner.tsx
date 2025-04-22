import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import * as React from "react";

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);

        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="w-full bg-header-background text-foreground p-4 text-center z-50 shadow-lg mb-7">
            <p className="text-lg font-medium">🚫 You are offline. Check your internet connection.</p>
            <Button
                type="submit"
                variant="outline"
                onClick={() => window.location.reload()}
                className="my-3 px-4 py-2 bg-foreground text-background rounded hover:bg-background hover:text-foreground transition hover:cursor-pointer"
            >
                Reload
            </Button>
            <Separator />
        </div>
    );
}
