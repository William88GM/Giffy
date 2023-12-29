import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "../../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";
import { LoadingGif } from "../LoadingGif";
import { menuContext } from "../../../Servicios/MenuContext";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { useLoadingGif } from "./useLoadingGif";

export function MenuFavoritos({ setInicio }) {
  const { favs, setFavs } = useContext(FavContext);
  const { setMenuIsActive } = useContext(menuContext);
  const [loading, setLoading] = useState();
  const [loadingDelete, setLoadingDelete] = useState(false);

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
      });
  }, []); //eslint-disable-line

  function handleClickGif() {
    setMenuIsActive(() => false);
  }

  function handleDeleteGif(id) {
    const toastId = toast.loading("Eliminando...");
    axios
      .delete(`${baseURL}/api/favoritos/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFavs(res.data);
        toast.dismiss(toastId);
        toast.success("Eliminado", {
          iconTheme: {
            primary: "#23272e",
            secondary: "#00ffff",
          },
        });
      });
  }

  return (
    <div className="Menufav">
      <button className="MenuAtrasButton" onClick={() => setInicio("Inicio")}>
        Home
      </button>
      {loading ? (
        <LoadingGif />
      ) : favs[0] ? (
        favs.map((elem) => (
          <div key={elem.original} className="favUserItem">
            <Link to={`/favorites/${elem.id_Giphy}`} onClick={handleClickGif}>
              <img
                className="gif-favorito"
                alt="gif favorito"
                src={elem.original}
              ></img>
            </Link>

            <button onClick={() => handleDeleteGif(elem.id_Giphy)}>❌</button>
          </div>
        ))
      ) : (
        <div className="no-hay-fav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            <path d="M12 6l-2 4l4 3l-2 4v3" />
          </svg>
          <h3>Aún no has guardado ningún favorito</h3>
        </div>
      )}
    </div>
  );
}
