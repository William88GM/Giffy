import { useContext, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
import axios from "axios";

export function LoginMenu({ setMenuToRegister }) {
  const { setSesion } = useContext(authContext);
  const [error, setError] = useState(false);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, password } = Object.fromEntries(formData.entries());

    axios
      .post(
        `${baseURL}/api/users/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSesion(res.data);
          setError(false);
        } else {
          setError(true);
        }
      });
  }

  return (
    <div className="LoginMenu">
      <span>¡Hola de nuevo!</span>
      <form onSubmit={handleSubmit}>
        <label>
          User
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
        {error ? <small>Usuario o contraseña incorrectos</small> : ""}
        <button>Iniciar sesión</button>
      </form>
      <small>¿Aún no tienes una cuenta?</small>
      <button onClick={() => setMenuToRegister("Register")}>Registrarse</button>
    </div>
  );
}
