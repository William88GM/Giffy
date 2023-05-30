import React, { useContext, useEffect } from "react";
import { FavContext } from "../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";

export default function Favoritos({ setCurrentMenu }) {
  const { favs, setFavs } = useContext(FavContext);
  useEffect(() => {
    fetch("http://localhost:3002/favoritos/all")
      .then((res) => res.json())
      .then((res) => {
        setFavs(res);
      });
  }, []); //eslint-disable-line

  return (
    <>
      <button onClick={() => setCurrentMenu(() => "Basic")}>Atras</button>
      {favs &&
        favs.map((e) => (
          <Link to={`/favorites/${e.id}`}>
            <img
              className="gif-favorito"
              alt="gif favorito"
              src={e.original}
              key={e.original}
            ></img>
          </Link>
        ))}
    </>
  );
}
