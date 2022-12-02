import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { petition } from "../Servicios/call_API";
import { Context } from "../Context";
import useObserver from "../hooks/useObserver";

export default function ListGifs() {
	const { search } = useParams(); //Extrae de la url el parametro, si es que hay uno
	const { gifs, setGifs } = useContext(Context);
	const [page, setPage] = useState(1);
	const elRef = useRef();
	const { isView } = useObserver({ elRef });

	//Llama a API cuando cambia search
	useEffect(() => {
		petition(search).then((arrayGIFS) => setGifs((prev) => arrayGIFS));
	}, [search]); //eslint-disable-line

	function handlePage() {
		petition(search, page).then(
			(nextGIFS) => setGifs((prev) => prev.concat(nextGIFS)),
			setPage((prev) => prev + 1)
		);
	}
	//Hay un problema cuando devuelvo mas de 16 resultados, al backear una pagina se mantienen algunos gifs que ya no deberian mostrarse
	//puede que el problema este en el context
	//El problema esta al reemplazar los trends?

	//Esto de abajo creo que hay una mejor forma de hacerlo

	return (
		<div className="App-content">
			{gifs.map((elem) => (
				<Link to={search ? `${elem.id}` : `trends/${elem.id}`} key={elem.id}>
					<img
						// loading="lazy"
						className="galery-item"
						src={elem.original}
						alt={elem.title}
					/>
				</Link>
			))}

			<div ref={elRef}></div>
			{isView ? () => handlePage : null}
		</div>
	);
}
