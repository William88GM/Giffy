import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context";

export default function Gif() {
  const { id } = useParams();
  const { gifs } = useContext(Context);

  const gif = gifs.find((elem) => elem.id === id);

  return <img className="galery-item" src={gif.original} alt={gif.title} />;
}
