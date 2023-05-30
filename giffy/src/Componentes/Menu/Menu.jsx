import React from "react";
import Basic from "./Basic";
import { useState } from "react";
import Favoritos from "./Favoritos";

export default function Menu({ className }) {
  const [currentMenu, setCurrentMenu] = useState("Basic");

  return (
    <div className={className}>
      {/* <---- MENU DESPLEGABLE */}
      <div className="scrollbar">
        {currentMenu === "Basic" ? (
          <Basic setCurrentMenu={setCurrentMenu} />
        ) : currentMenu === "Favoritos" ? (
          <Favoritos setCurrentMenu={setCurrentMenu} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
