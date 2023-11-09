import { Link } from "react-router-dom";
import logo from "../assets/logo_GF.svg";
import { useHistorySearch } from "../hooks/HistorySearch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu/Menu";
import { menuContext } from "../Servicios/MenuContext";

export default function Nav() {
  const { updateHistory, recents } = useHistorySearch();
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();
  const { menuIsActive, setMenuIsActive } = useContext(menuContext);

  function handleSearch(evt) {
    setValueSearch(evt.target.value); //Actualiza el valor del input
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    navigate(`/${valueSearch}`); //Cambia url
    updateHistory(valueSearch);
    window.scroll(0, 0);
  }
  function handleMenu() {
    setMenuIsActive(!menuIsActive);
  }
  function handleReload() {
    window.scroll(0, 0);
    navigate("/", { replace: true });
  }
  return (
    <nav>
      <Link translate="no" to={"/"} onClick={handleReload} className="logo">
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
      <button className="MenuButton" onClick={handleMenu}>
        Menú
      </button>
      <Menu />
    </nav>
  );
}
