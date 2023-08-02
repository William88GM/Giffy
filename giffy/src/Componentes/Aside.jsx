import React from "react";
import { useHistorySearch } from "../hooks/HistorySearch";
import { Recientes } from "./Recientes";
import { Recomendados } from "./Recomendados";

export default function Aside({ setMenuIsActive, menu }) {
    const { list } = useHistorySearch();
    return list[0] ? (
        <Recientes setMenuIsActive={setMenuIsActive} />
    ) : (
        <Recomendados setMenuIsActive={setMenuIsActive} />
    );
}
