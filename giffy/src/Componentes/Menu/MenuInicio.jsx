import React, { useState } from "react";
import Aside from "../Aside";
import { MenuFavoritos } from "./MenuFavoritos";

export function MenuInicio() {
    const [inicioOrFavs, setInicioOrFavs] = useState("Inicio");
    return inicioOrFavs === "Inicio" ? (
        <ul>
            <li>
                <button
                    className="BasicFavButton"
                    onClick={() => setInicioOrFavs("Favs")}
                >
                    Favoritos
                </button>
            </li>

            <Aside menu={true} />
        </ul>
    ) : (
        <MenuFavoritos setInicioOrFavs={setInicioOrFavs} />
    );
}
