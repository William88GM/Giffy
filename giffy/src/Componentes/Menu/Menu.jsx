import React, { useContext } from "react";
import { menuContext } from "../../Servicios/MenuContext";
import { MenuInicioUser } from "./Logged/InicioOrFavs";
import { LoginLogup } from "./NotLogged/LoginLogup";
import { authContext } from "../../Servicios/authContex";

export default function Menu() {
  const { sesion } = useContext(authContext);
  const { menuIsActive } = useContext(menuContext);

  return (
    <div className={menuIsActive ? "Menu" : "MenuHidden"}>
      {sesion ? <MenuInicioUser /> : <LoginLogup />}
    </div>
  );
}
