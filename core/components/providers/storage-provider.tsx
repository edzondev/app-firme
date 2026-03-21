import { initStorage } from "@/core/storage/storage";
import { useEffect, useState, type PropsWithChildren } from "react";

export default function StorageProvider({ children }: PropsWithChildren) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initStorage()
            .then(() => setReady(true))
            .catch(() => setReady(true));
    }, []);

    if (!ready) return null;

    return <>{children}</>;
}