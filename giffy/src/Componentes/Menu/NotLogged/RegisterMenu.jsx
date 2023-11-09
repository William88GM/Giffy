import axios from "axios";
import { useContext } from "react";
import { authContext } from "../../../Servicios/authContex";
export function RegisterMenu({ setMenuToLogin }) {
  const { setSesion } = useContext(authContext);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { username, name, password } = Object.fromEntries(formData.entries());

    axios
      .post(
        `${baseURL}/api/users/register`,
        { username, name, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSesion(res.data);
          // setError(false);
        } else {
          // setError(true);
        }
      });
  }

  return (
    <div className="LoginMenu">
      <span>Hola, vamo a registrarno lokoooo</span>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario
          <input type="text" name="username" />
        </label>
        <label>
          Nombre
          <input type="text" name="username" />
        </label>
        <label>
          Contraseña
          <input
            autoComplete="current-password"
            type="password"
            name="password"
          />
        </label>
        <button>Registrarse</button>
      </form>
      <small>¿Ya tienes una cuenta?</small>
      <button onClick={() => setMenuToLogin("Login")}>Login</button>
    </div>
  );
}
