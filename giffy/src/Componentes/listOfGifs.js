import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { petition } from "./../Servicios/call_API";

export default function ListGifs() {
  const { search } = useParams();

  const [array, setArray] = useState([]);

  //Llama a API cuando se renderiza el componente
  useEffect(() => {
    petition(search).then((arrayAPI) => setArray(arrayAPI));
  }, [search]);

  return array.map((elem) => (
    <img
      key={elem.low}
      className="galery-item"
      src={elem.low}
      alt={`gif-${elem.id}`}
    />
  ));
}
