import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menuContext } from "../Servicios/MenuContext";
import axios from "axios";

export function Recomendados() {
  const [list, setList] = useState([]);
  const { setMenuIsActive } = useContext(menuContext);
  const [loading, setLoading] = useState();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      // : "https://giffy-back.onrender.com";
      :"https://giffybackindependiente-william88gms-projects.vercel.app";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/api/historial`, {
        withCredentials: true,
      })
      .then((res) => {
        setList(res.data);
        setLoading(false);
      });
  }, []); //eslint-disable-line

  function handleClick() {
    setMenuIsActive(() => false);
    window.scroll(0, 0);
  }

  return loading ? (
    <h4>Cargando</h4>
  ) : (
    <aside>
      <span> Más buscados</span>
      <ul>
        {list.map((el, i) => (
          <li key={i}>
            <Link onClick={handleClick} to={el}>
              {el}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
