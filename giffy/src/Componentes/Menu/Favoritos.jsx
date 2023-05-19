import React from "react";

export default function Favoritos({ setCurrentMenu }) {
  return (
    <div>
      <button onClick={() => setCurrentMenu(() => "Basic")}>Atras</button>
    </div>
  );
}
