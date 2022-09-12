import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { petition } from "../Servicios/call_API";

export default function ListGifs() {
  const { search } = useParams(); //Extrae de la url el parametro

  const [array, setArray] = useState([]);

  //Llama a API cuando cambia search
  useEffect(() => {
    petition(search).then((arrayAPI) => setArray(arrayAPI));
  }, [search]);

  return array.map((elem) => (
    <img
      key={elem.id}
      className="galery-item"
      src={elem.low}
      alt={`gif-${elem.id}`}
    />
  ));
}
