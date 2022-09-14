import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Context";

export default function ListGifs() {
  const { search } = useParams(); //Extrae de la url el parametro

  const { gifs, setGifs } = useContext(Context);

  //Llama a API cuando cambia search
  useEffect(() => {
    petition(search).then((arrayAPI) => setGifs(arrayAPI));
  }, [search, setGifs]); //setGifs para que?

  return gifs.map((elem) => (
    <Link to={`${elem.id}`} key={elem.id}>
      <img className="galery-item" src={elem.original} alt={elem.title} />
    </Link>
  ));
}
