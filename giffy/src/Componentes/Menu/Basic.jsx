import React from "react";
import Aside from "../Aside";

export default function Basic({ setCurrentMenu, setMenuIsActive }) {
    function handleClick() {
        setCurrentMenu(() => "Favoritos");
    }
    return (
        <ul>
            <li>
                <button className="BasicFavButton" onClick={handleClick}>
                    Favoritos
                </button>
            </li>

            <Aside setMenuIsActive={setMenuIsActive} menu={true} />
        </ul>
    );
}
