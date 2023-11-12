import React, { useContext } from "react";
import { useHistorySearch } from "../hooks/HistorySearch";
import { Recientes } from "./Recientes";
import { Recomendados } from "./Recomendados";
import { authContext } from "../Servicios/authContex";

export default function Aside({ setMenuIsActive, menu }) {
  const { list } = useHistorySearch();
  const { sesion } = useContext(authContext);

  return list[0] ? (
    <Recientes setMenuIsActive={setMenuIsActive} />
  ) : (
    <Recomendados setMenuIsActive={setMenuIsActive} />
  );
}
