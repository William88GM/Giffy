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
        console.log(res.data);
      });
  }, []); //eslint-disable-line

  function handleClickGif() {
    setMenuIsActive(() => false);
  }

  function handleDeleteGif(id) {
    console.log("ID: " + id);
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
        console.log(res.data);
      });
  }

  return (
    <div className="Menufav">
      <Toaster
        toastOptions={{
          style: {
            background: "#414855",
            color: "#fff",
            // border: "1px solid #00ffff44",
            // boxShadow: "0px 0px 3px 2px #00ffff44",
          },
        }}
      />
      <button className="MenuAtrasButton" onClick={() => setInicio("Inicio")}>
        Home
      </button>
      {loading ? (
        <LoadingGif />
      ) : (
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
      )}
    </div>
  );
}
