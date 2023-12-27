import axios from "axios";
import Aside from "../../Aside";
import { useContext, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
import { LoadingGif } from "../LoadingGif";

export function InicioUser({ setFavs }) {
  const { sesion, setSesion } = useContext(authContext);
  const [loading, setLoading] = useState();
  // const randomProfilePhoto = [
  //   "",
  // ];
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
    <ul style={{ display: "flex", flexDirection: "column" }}>
      <img //eslint-disable-line
        className="profile-picture"
        src={
          sesion && sesion.photo
          // ||randomProfilePhoto[0]
        }
        alt="Profile picture"
      />
      <li>
        <h3>{sesion && sesion.name}</h3>
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
