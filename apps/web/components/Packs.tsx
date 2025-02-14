"use client";

import { BACKEND_URL } from "@/app/config";
import { PackCard, TPack } from "./PackCard";
import axios from "axios";
import { PacksClient } from "./PacksClient";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function Packs() {
    const [packs, setPacks] = useState<TPack[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPacks() {
            try {
                const res = await axios.get(`${BACKEND_URL}/pack/bulk`);
                setPacks(res.data.packs ?? []);
            } catch (error) {
                console.error('Failed to fetch packs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPacks();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <Skeleton>  </Skeleton>
        </div>
    }

    return <PacksClient packs={packs} />;
}