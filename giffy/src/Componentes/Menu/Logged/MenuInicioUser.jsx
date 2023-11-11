import React, { useContext, useState } from "react";
import Aside from "../../Aside";
import { MenuFavoritos } from "./MenuFavoritos";
import { authContext } from "../../../Servicios/authContex";
import axios from "axios";

export function MenuInicioUser() {
  const [inicioOrFavs, setInicioOrFavs] = useState("Inicio");
  const { sesion, setSesion } = useContext(authContext);

  function handleLogOut() {
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3002"
        : "https://giffy-back.onrender.com";

    axios
      .post(
        `${baseURL}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSesion(false);
        console.log(res);
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
