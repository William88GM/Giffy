import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "../../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";
import { LoadingGif } from "../LoadingGif";
import { menuContext } from "../../../Servicios/MenuContext";

import axios from "axios";
// import { useLoadingGif } from "./useLoadingGif";

export function MenuFavoritos({ setInicio }) {
  const { favs, setFavs } = useContext(FavContext);
  const { setMenuIsActive } = useContext(menuContext);
  const [loading, setLoading] = useState();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/api/favoritos/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setFavs(res.data);
        setLoading(false);
        console.log(res.data);
      });
  }, []); //eslint-disable-line

  function handleClickGif() {
    setMenuIsActive(() => false);
  }

  return (
    <>
      <button className="MenuAtrasButton" onClick={() => setInicio("Inicio")}>
        Inicio
      </button>
      {loading ? (
        <LoadingGif />
      ) : (
        favs.map((e) => (
          <Link to={`/favorites/${e.id_Giphy}`} onClick={handleClickGif}>
            <img
              className="gif-favorito"
              alt="gif favorito"
              src={e.original}
              key={e.original}
            ></img>
          </Link>
        ))
      )}
    </>
  );
}
