import React, { useContext } from "react";
import { MenuInicio } from "./MenuInicio";
import { useState } from "react";
import { LoginMenu } from "./LoginMenu";
import { menuContext } from "../../Servicios/MenuContext";

export default function Menu() {
    const [logged, setLogged] = useState(readLocalStorage());
    const [logOrReg, setLoginOrRegister] = useState("Login");
    const { menuIsActive } = useContext(menuContext);
    function readLocalStorage(test) {
        if (test) setLogged(true);

        return false; //imaginamos que no esta logged
    }

    return (
        <div className={menuIsActive ? "Menu" : "MenuHidden"}>
            {logged ? (
                <MenuInicio />
            ) : logOrReg === "Login" ? (
                <LoginMenu
                    readLocalStorage={readLocalStorage}
                    setMenuToRegister={setLoginOrRegister}
                />
            ) : (
                "Registro"
            )}
        </div>
    );
}
