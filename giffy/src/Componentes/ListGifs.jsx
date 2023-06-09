import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import useObserver from "../hooks/useObserver";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FavContext } from "../Servicios/favoritosContextProvider";

export default function ListGifs({ pagination = true }) {
    const { search } = useParams(); //Extrae de la url el parametro, si es que hay uno
    const { gifs, setGifs } = useContext(Context);
    const { favs, setFavs } = useContext(FavContext);
    const [page, setPage] = useState(1);
    const elRef = useRef();
    const { show } = useObserver({ elRef });
    // const [buscado, setBuscado] = useState("");

    //Llama a API cuando cambia search
    useEffect(() => {
        //Aqui el problema, una vez que se buscó, al abrir una foto y luego volver a la pagina se vuelve a cargar por lo que se reemplaza el array con imagenes caargadas al scrollear con las primeras imagenes que aparecen al buscar
        petition(search).then((arrayGIFS) => setGifs((prev) => arrayGIFS));
    }, [search]); //eslint-disable-line

    useEffect(() => {
        if (!show) return;
        handlePage(page);
        setPage((prev) => prev + 1);
    }, [show]); //eslint-disable-line

    function handlePage(pagePlus) {
        if (pagination) {
            petition(search, pagePlus).then((nextGIFS) => {
                setGifs((prev) => prev.concat(nextGIFS));
                //agregar condicional para que no haga llamadas cuando no hay mas gifs?
            });
        }
    }

    function handleFavorite(id) {
        axios
            .post(`https://giffy-back.onrender.com/favoritos/${id}`) //http://localhost:3002
            .then(
                (res) => setFavs((prevFavs) => prevFavs.concat(res.data)),
                toast.success("Guardado")
            );
    }

    return (
        <div className={gifs[1] ? "App-content" : "App-content-1-image"}>
            {/* Si hay un solo gif la imagen se rompe, por eso cambio la clase*/}
            <Toaster />
            {gifs.map((elem) => (
                <div key={elem.id}>
                    <Link to={search ? `${elem.id}` : `trends/${elem.id}`}>
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
            ))}
            <div ref={elRef}></div>
        </div>
    );
}
