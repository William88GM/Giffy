import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Servicios/Context";
import arrow from "../assets/arrow.svg";
import Aside from "./Aside";

export default function Gif() {
    const { id } = useParams();
    const { gifs } = useContext(Context);
    const navigate = useNavigate();
    const [gif, setGif] = useState({});

    useEffect(() => {
        setGif(gifs.find((elem) => elem.id === id));

        window.scroll(0, 0);
    }, [id]); //eslint-disable-line

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
    /* 
    //NO SE COMO PERO SE ARREGLO Y YA NO HACE FALTA SETEARLE LA ALTURA A LA IMG, igual no estaba terminado el codigo
    // /useEffect que calcule la altura de la imagen renderizada y se lo aplique a la altura intrinseca de la img, para que en movil se vea mejor sin importar la relacion de aspecto. pero antes probar en css con max width u otra cosa


    // const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    // const gifImageRef = useRef(null);
    // useEffect(() => {
    //     if (gif) getImageSize(gif.original);
    // }, [gif]);

    // useEffect(() => {
    //     if (imageSize.height > 0) {
    //         // Aplicar el estilo al segundo img usando useRef
    //         gifImageRef.current.style.height = `${imageSize.height}px`;
    //     }
    // }, [imageSize]);

    // function getImageSize(url) {
    //     const img = new Image();
    //     img.onload = function () {
    //         const width = img.width;
    //         const height = img.height;
    //         setImageSize({ width, height });
    //     };
    //     img.src = url;
    //     console.log(imageSize.height);
    // }
*/
    return (
        <>
            <div className="gif">
                {gif && (
                    <>
                        <img
                            src={gif.original}
                            alt={gif.title}
                            // ref={gifImageRef}
                            // style={{ height: `${imageSize.height}px` }}
                        />
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
                        <Aside />
                    </>
                )}
            </div>
        </>
    );
}
