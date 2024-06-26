import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo_GF.svg";
import { useOfflineHistory } from "../hooks/useOfflineHistory";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu/Menu";
import { menuContext } from "../Servicios/MenuContext";
import axios from "axios";
import { authContext } from "../Servicios/authContex";
import { EmailNotification } from "./EmailNotification";
import { historyUserContext } from "../Servicios/historyUserContext";

export default function Nav() {
  const { updateHistory } = useOfflineHistory();
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();
  const { menuIsActive, setMenuIsActive } = useContext(menuContext);
  const { setListUser } = useContext(historyUserContext);
  const { sesion, setSesion } = useContext(authContext);
  const location = useLocation();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      // : "https://giffy-back.onrender.com";
      :"https://giffybackindependiente-william88gms-projects.vercel.app";
  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#logout") return;

    axios
      .post(
        `${baseURL}/api/users/autoLogin`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSesion(res.data);
        }
      });
  }, []); //eslint-disable-line

  function handleSearch(evt) {
    setValueSearch(evt.target.value); //Actualiza el valor del input
  }

  function handleHistoryLogged(valueSearch) {
    axios
      .put(
        `${baseURL}/api/historial`,
        { historyElement: valueSearch },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setListUser(res.data.history);
      }); //Guardar en estado global de historial
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate(`/${valueSearch}`); //Cambia url

    if (sesion) {
      handleHistoryLogged(valueSearch);
    } else {
      updateHistory(valueSearch);
    }
    setMenuIsActive(false);
    window.scroll(0, 0);
  }
  function handleMenu() {
    setMenuIsActive(!menuIsActive);
  }

  
  function handleReload() {
    window.scroll(0, 0);
    navigate("/", { replace: true });
  }
//Moraleja: El scroll en el body es malo ❌

  return (
    <nav>
      <EmailNotification />

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
