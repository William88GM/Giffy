import React, { useContext, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Servicios/Context";
import useObserver from "../hooks/useObserver";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FavContext } from "../Servicios/favoritosContextProvider";
import useRenderSearch from "../hooks/useRenderSearch";
import usePagination from "../hooks/usePagination";
import { Loading } from "./Loading";

export default function ListGifs() {
    const { gifs } = useContext(Context);
    const { favs, setFavs } = useContext(FavContext);
    const { search } = useParams();
    const elRef = useRef();
    const { show } = useObserver({ elRef });

    useRenderSearch();
    //Cuando tenga tiempo les implemento el filtro de gifs, el problema que tiene es que no funciona el primer scroll, carga los siguientes gifs pero al instante los elimina y reemplaza con los inicialesm solo ocurre la primera vez
    usePagination({ show });

    function handleFavorite(id) {
        axios
            .post(`https://giffy-back.onrender.com/favoritos/${id}`) //http://localhost:3002
            .then((res) => {
                if (favs) {
                    setFavs((prevFavs) => prevFavs.concat(res.data));
                }
                toast.success("Guardado");
            });
    }

    return (
        <>
            <div className={gifs[1] ? "App-content" : "App-content-1-image"}>
                {/* Si el resultado de busqueda es un solo gif la imagen se rompe, por eso cambio la clase*/}
                <Toaster />
                {gifs.map(
                    (
                        elem,
                        i //API con gifs repetidos!!!
                    ) => (
                        <div key={i} className="gif_in_list">
                            <Link
                                to={search ? `${elem.id}` : `trends/${elem.id}`}
                            >
                                <img
                                    // loading="lazy"
                                    className="galery-item"
                                    src={elem.lowRes}
                                    alt={elem.title}
                                />
                            </Link>
                            <button
                                title="Añadir a Favoritos"
                                onClick={() => handleFavorite(elem.id)}
                            >
                                💙
                            </button>
                        </div>
                    )
                )}
            </div>
            <div ref={elRef}></div>
            {show ? <Loading /> : ""}
        </>
    );
}
