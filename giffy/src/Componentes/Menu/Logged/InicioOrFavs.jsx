import React, { useContext, useState } from "react";

import { MenuFavoritos } from "./FavsUser";
import { authContext } from "../../../Servicios/authContex";

import { InicioUser } from "./InicioUser";

export function MenuInicioUser() {
  const [inicioOrFavs, setInicioOrFavs] = useState("Inicio");

  return inicioOrFavs === "Inicio" ? (
    <InicioUser setFavs={setInicioOrFavs} />
  ) : (
    <MenuFavoritos setInicio={setInicioOrFavs} />
  );
}
