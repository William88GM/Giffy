import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { petition } from "../Servicios/call_API";
import { Context } from "../Context";

export default function ListGifs() {
  const { search } = useParams(); //Extrae de la url el parametro, si es que hay uno

  const { gifs, setGifs } = useContext(Context);
  const [page, setPage] = useState(1);

  //Llama a API cuando cambia search
  useEffect(() => {
    petition(search).then((arrayAPI) => setGifs((prev) => arrayAPI));
  }, [search, setGifs]); //setGifs para que?

  function handlePage() {
    petition(search, page).then(
      (nextGIFS) => setGifs((prev) => prev.concat(nextGIFS)),
      setPage((prev) => prev + 1)
    );
  }
  //jonmircha
  //puede que el problema este en el context
  //El problema esta al reemplazar los trends
  if (search) {
    return (
      <>
        {gifs.map((elem) => (
          <Link to={`${elem.id}`} key={elem.id}>
            <img className="galery-item" src={elem.original} alt={elem.title} />
          </Link>
        ))}

        <button onClick={handlePage}>Cargar mas</button>
      </>
    );
  } else {
    return (
      <>
        {gifs.map((elem) => (
          <Link to={`trends/${elem.id}`} key={elem.id}>
            <img className="galery-item" src={elem.original} alt={elem.title} />
          </Link>
        ))}
      </>
    );
  }
}
