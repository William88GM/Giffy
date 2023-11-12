import axios from "axios";
import Aside from "../../Aside";
import { useContext, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
import { LoadingGif } from "../LoadingGif";

export function InicioUser({ setFavs }) {
  const { sesion, setSesion } = useContext(authContext);
  const [loading, setLoading] = useState();

  function handleLogOut() {
    setLoading(true);

    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3002"
        : "https://giffy-back.onrender.com";

    axios
      .post(
        `${baseURL}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSesion(false);
        setLoading(false);
        console.log(res);
      });
  }

  return loading ? (
    <LoadingGif />
  ) : (
    <ul>
      <li>
        <span>{sesion && sesion.name}</span>
      </li>
      <li>
        <button className="BasicFavButton" onClick={() => setFavs("Favs")}>
          Favoritos
        </button>
        <button onClick={handleLogOut}>Cerrar sesión</button>
      </li>

      <Aside menu={true} />
    </ul>
  );
}
