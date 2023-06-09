import React from "react";
import Aside from "../Aside";

export default function Basic({ setCurrentMenu }) {
    return (
        <ul>
            <li>
                <button
                    className="BasicFavButton"
                    onClick={() => setCurrentMenu(() => "Favoritos")}
                >
                    Favoritos
                </button>
            </li>
            {/* <li>B</li>
      <li>C</li> */}
            <li>Salir</li>
            ----- Divisor imaginario -----
            <Aside />
        </ul>
    );
}
