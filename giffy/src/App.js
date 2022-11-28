import "./Estilos/App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistorySearch } from "./hooks/HistorySearch";
import Nav from "./Componentes/Nav";
import ListGifs from "./Componentes/ListGifs";
import Aside from "./Componentes/Aside";
import { ContextProvider } from "./Context";
import Gif from "./Componentes/Gif";
import { Page404 } from "./Componentes/Page404";

function App() {
	const [valueSearch, setValueSearch] = useState("");
	const navigate = useNavigate();
	const { updateHistory, recents } = useHistorySearch();

	function handleSearch(evt) {
		setValueSearch(evt.target.value); //Actualiza el valor del input
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		navigate(`/${valueSearch}`); //Cambia url
		updateHistory(valueSearch);
	}

	return (
		<ContextProvider>
			<Nav Search={handleSearch} Submit={handleSubmit} />
			<main>
				<article className="App-content">
					<Routes>
						<Route path="/" element={<ListGifs />} />
						<Route path={`/:search`} element={<ListGifs />} />

						<Route path="/:search/:id" element={<Gif />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</article>
			</main>
			<Aside recents={recents} />
			<footer></footer>
		</ContextProvider>
	);
}

export default App;
