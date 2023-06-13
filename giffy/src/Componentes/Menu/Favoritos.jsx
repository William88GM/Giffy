import React, { useContext, useEffect } from "react";
import { FavContext } from "../../Servicios/favoritosContextProvider";
import { Link } from "react-router-dom";
import { LoadingGif } from "./LoadingGif";
// import { useLoadingGif } from "./useLoadingGif";

export default function Favoritos({ setCurrentMenu, setMenuIsActive }) {
    const { favs, setFavs } = useContext(FavContext);
    // const random = useLoadingGif();
    useEffect(() => {
        if (favs) return;
        // setFavs(random);
        fetch("https://giffy-back.onrender.com/favoritos/all") //http://localhost:3002
            .then((res) => res.json())
            .then((res) => {
                setFavs(res);
            });
    }, []); //eslint-disable-line

    function handleClickButton() {
        setCurrentMenu(() => "Basic");
    }
    function handleClickGif() {
        setMenuIsActive(() => false);
    }

    return (
        <>
            <button onClick={handleClickButton}>Atras</button>
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
