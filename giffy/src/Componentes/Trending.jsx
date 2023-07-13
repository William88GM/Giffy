import React, { useEffect } from "react";
import ListGifs from "./ListGifs";

export default function Trending() {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <>
            <h3>🔥 Tendencias 🔥</h3>
            <ListGifs />
        </>
    );
}
