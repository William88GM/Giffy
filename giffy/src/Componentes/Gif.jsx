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
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      // : "https://giffy-back.onrender.com";
      :"https://giffybackindependiente-william88gms-projects.vercel.app";
 
  useEffect(() => {
    setGif(gifs.find((elem) => elem.id === id));

    window.scroll(0, 0);
  }, [id]); //eslint-disable-line

  if (!gif) {
    fetch(
      `https://api.giphy.com/v1/gifs/${id}?api_key=${process.env.REACT_APP_API_KEY}`
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
              href={`${baseURL}/api/download/${id}`}
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
