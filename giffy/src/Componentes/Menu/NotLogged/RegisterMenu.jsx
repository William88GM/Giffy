import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
export function RegisterMenu({ setMenuToLogin }) {
  const { setSesion } = useContext(authContext);
  const [errors, setErrors] = useState({});
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { username, username2, name, password } = Object.fromEntries(
      formData.entries()
    );
    if (username !== username2) {
      setErrors({ Email: "Los mails deben ser identicos" });
      return;
    }
    axios
      .post(
        `${baseURL}/api/users/register`,
        { username, name, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 201) {
          setSesion(res.data);
          // setError(false);
        }
      })
      .catch((res) => {
        if (res.response.status === 409) {
          setErrors({
            conflict: "Ya existe una cuenta con ese mail",
          });
          console.log(errors);
        }
      });
  }

  return (
    <div className="LoginMenu">
      <span>Bienvenido</span>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="username" />
        </label>
        <label>
          Email
          <input type="email" name="username2" />
        </label>
        <label>
          Nombre
          <input type="text" name="name" />
        </label>
        <label>
          Contraseña
          <input
            autoComplete="current-password"
            type="password"
            name="password"
          />
        </label>

        {Object.keys(errors).length > 0 && (
          <div className="errores">
            <ul>
              {Object.keys(errors).map((clave, index) => (
                <li key={index}>{errors[clave]}</li>
              ))}
            </ul>
          </div>
        )}

        <button>Registrarse</button>
      </form>
      <small>¿Ya tienes una cuenta?</small>
      <button onClick={() => setMenuToLogin("Login")}>Login</button>
    </div>
  );
}
