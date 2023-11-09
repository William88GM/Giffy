import React, { useContext, useState } from "react";
import Aside from "../../Aside";
import { MenuFavoritos } from "./MenuFavoritos";
import { authContext } from "../../../Servicios/authContex";
import axios from "axios";

export function MenuInicioUser() {
  const [inicioOrFavs, setInicioOrFavs] = useState("Inicio");
  const { sesion, setSesion } = useContext(authContext);

  function handleLogOut() {
    axios.post("http://localhost:3002/api/users/logout").then((res) => {
      setSesion(false);
    });
  }

  return inicioOrFavs === "Inicio" ? (
    <ul>
      <li>
        <span>{sesion && sesion.name}</span>
      </li>
      <li>
        <button
          className="BasicFavButton"
          onClick={() => setInicioOrFavs("Favs")}
        >
          Favoritos
        </button>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </li>

      <Aside menu={true} />
    </ul>
  ) : (
    <MenuFavoritos setInicioOrFavs={setInicioOrFavs} />
  );
}
