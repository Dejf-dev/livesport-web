import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";

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
        <div className="fixed top-0 left-0 w-full bg-header-background text-foreground p-4 text-center z-50 shadow-lg">
            <p className="text-lg font-medium">🚫 You are offline. Check your internet connection.</p>
            <Button
                type="submit"
                variant="outline"
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-foreground text-background rounded hover:bg-background hover:text-foreground transition hover:cursor-pointer"
            >
                Reload
            </Button>
        </div>
    );
}
