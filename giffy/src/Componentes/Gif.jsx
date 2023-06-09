import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Servicios/Context";
import arrow from "../assets/arrow.svg";

export default function Gif() {
    const { id } = useParams();
    const { gifs } = useContext(Context);
    const navigate = useNavigate();
    const [gif, setGif] = useState({});

    useEffect(() => {
        setGif(gifs.find((elem) => elem.id === id));
        window.scroll(0, 0);
    }, [id]);

    if (!gif) {
        fetch(
            `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
        )
            .then((res) => res.json())
            .then((res) =>
                setGif({
                    original: res.data.images.original.webp,
                    original_dot_gif: res.data.images.original.url,
                    title: res.data.title,
                })
            );
    }

    return (
        <>
            <div className="gif">
                {gif && (
                    <>
                        <img src={gif.original} alt={gif.title} />
                        <img
                            src={arrow}
                            className="Back"
                            alt="Back"
                            onClick={() => navigate(-1)}
                        />
                        <a
                            href={`https://giffy-back.onrender.com/download/${id}`} //http://localhost:3002
                            alt="Descargar gif"
                            className="Descargar"
                        >
                            DESCARGAR
                        </a>

                        {/* 
            NO FUNCIONA, giphy no te deja, y el atributo download tampoco funciona
            
            <a
              href={gif.original_dot_gif}
              href={
                "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVlNzhkZGM3ZTQ5MzdhYmY3ZGY3YmMwZGJmZWJjZDNhYzRmZjgzYyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/lQPKybhDa2ZO1qJVLo/giphy.gif"
              }
              alt="Descargar gif"
              download
              className="Descargar"
            >
              DESCARGAR
            </a> */}
                    </>
                )}
            </div>
        </>
    );
}
