import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import arrow from "../assets/arrow.jpg";

export default function Gif() {
  const { id } = useParams();
  const { gifs } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const gif = gifs.find((elem) => elem.id === id);

  return (
    <>
      <div className="gif">
        <img src={gif.original} alt={gif.title} />
        <img
          src={arrow}
          className="Back"
          alt="Back"
          onClick={() => navigate(-1)}
        ></img>
      </div>
    </>
  );
}
