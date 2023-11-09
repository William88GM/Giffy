import React, { useContext, useEffect } from "react";
import { FavContext } from "../../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";
import { LoadingGif } from "../LoadingGif";
import { menuContext } from "../../../Servicios/MenuContext";
import Cookies from "js-cookie";
import axios from "axios";
// import { useLoadingGif } from "./useLoadingGif";

export function MenuFavoritos({ setInicioOrFavs }) {
  const { favs, setFavs } = useContext(FavContext);
  const { setMenuIsActive } = useContext(menuContext);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  useEffect(() => {
    if (favs[0]) return;
    // const token = Cookies.get("token");

    axios
      .get(`${baseURL}/api/favoritos/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setFavs(res.data);
        console.log(res.data);
      });
  }, []); //eslint-disable-line

  function handleClickGif() {
    setMenuIsActive(() => false);
  }

  return (
    <>
      <button
        className="MenuAtrasButton"
        onClick={() => setInicioOrFavs("Inicio")}
      >
        Inicio
      </button>
      {favs[0] ? (
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
      ) : (
        <LoadingGif />
      )}
    </>
  );
}
