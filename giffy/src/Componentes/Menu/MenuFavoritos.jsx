import React, { useContext, useEffect } from "react";
import { FavContext } from "../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";
import { LoadingGif } from "./LoadingGif";
import { menuContext } from "../../Servicios/MenuContext";
// import { useLoadingGif } from "./useLoadingGif";

export function MenuFavoritos({ setInicioOrFavs }) {
    const { favs, setFavs } = useContext(FavContext);
    const { setMenuIsActive } = useContext(menuContext);

    useEffect(() => {
        if (favs) return;
        fetch("https://giffy-back.onrender.com/favoritos/all") //http://localhost:3002
            .then((res) => res.json())
            .then((res) => {
                setFavs(res);
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
            {favs ? (
                favs.map((e) => (
                    <Link
                        to={`/favorites/${e.id_giffy}`}
                        onClick={handleClickGif}
                    >
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
