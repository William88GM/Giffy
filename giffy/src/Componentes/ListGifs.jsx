import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import useObserver from "../hooks/useObserver";

export default function ListGifs({ pagination = true }) {
	const { search } = useParams(); //Extrae de la url el parametro, si es que hay uno
	const { gifs, setGifs } = useContext(Context);
	const [page, setPage] = useState(1);
	const elRef = useRef();
	const { show } = useObserver({ elRef });
	const [buscado, setBuscado] = useState("");
	//Llama a API cuando cambia search
	useEffect(() => {
		//Aqui el problema, una vez que se buscó, al abrir una foto y luego volver a la pagina se vuelve a cargar por lo que se reemplaza el array con imagenes caargadas al scrollear con las primeras imagenes que aparecen al buscar
		petition(search).then((arrayGIFS) => setGifs((prev) => arrayGIFS));
	}, [search]); //eslint-disable-line
	useEffect(() => {
		if (!show) return;
		handlePage(page);
		setPage((prev) => prev + 1);
	}, [show]);
	function handlePage(pagePlus) {
		if (pagination) {
			
			petition(search, pagePlus).then((nextGIFS) => {
				setGifs((prev) => prev.concat(nextGIFS));
				//agregar condicional para que no haga llamadas cuando no hay mas gifs?
			});
		}
	}

	return (
		<div className={gifs[1] ? "App-content" : "App-content-1-image"}>
			{/* Si hay un solo gif la imagen se rompe, por eso cambio la clase*/}
			{gifs.map((elem) => (
				<Link to={search ? `${elem.id}` : `trends/${elem.id}`} key={elem.id}>
					<img
						// loading="lazy"
						className="galery-item"
						src={elem.lowRes}
						alt={elem.title}
					/>
				</Link>
			))}

			<div ref={elRef}></div>
		</div>
	);
}
