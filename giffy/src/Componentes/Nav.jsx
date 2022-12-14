import { Link } from "react-router-dom";
import logo from "../assets/logo_GF.svg";
import { useHistorySearch } from "../hooks/HistorySearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
	const { updateHistory, recents } = useHistorySearch();
	const [valueSearch, setValueSearch] = useState("");
	const navigate = useNavigate();

	function handleSearch(evt) {
		setValueSearch(evt.target.value); //Actualiza el valor del input
	}
	function handleSubmit(evt) {
		evt.preventDefault();
		navigate(`/${valueSearch}`); //Cambia url
		updateHistory(valueSearch);
	}

	return (
		<nav>
			<Link to={"/"} className="logo">
				<img src={logo} alt="logo" />
				Giffy
			</Link>
			<form onSubmit={handleSubmit}>
				<div className="div-absolute">
					<input
						placeholder="Buscar gifs"
						onChange={handleSearch}
						value={valueSearch}
					/>
					<button type="submit">Buscar</button>
					<button
						onClick={() => setValueSearch("")}
						className="absolute-button"
					>
						X
					</button>
				</div>
			</form>
		</nav>
	);
}
