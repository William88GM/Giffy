import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
import toast from "react-hot-toast";
import { EmailNotification } from "../../EmailNotification";
import { LoadingGif } from "../LoadingGif";

export function RegisterMenu({ setMenuToLogin }) {
  const { setSesion } = useContext(authContext);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState();
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
      setErrors([{ message: "Los mails deben ser identicos" }]);
      return;
    }
    setLoading(true);
    axios
      .post(
        `${baseURL}/api/users/register`,
        { username, name, password },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          setSesion(res.data);
        }
      })
      .catch((res) => {
        setLoading(false);

        if (res.code === "ERR_NETWORK") {
          setErrors([
            {
              message: "Sin conexion a internet",
            },
          ]);
        }
        if (res.response.status === 409) {
          setErrors([
            {
              message: "Ya existe una cuenta con ese mail",
            },
          ]);
        }

        if (res.response.status === 400) {
          const zodErrors = res.response.data.issues.map((e) => {
            const { message } = e;
            return { message };
          });
          setErrors(zodErrors);
        }
      });
  }

  function handleShowPassword(e) {
    setShowPassword(!showPassword);
    e.preventDefault();
  }

  return loading ? (
    <LoadingGif />
  ) : (
    <div className="LoginMenu">
      <span>Bienvenido</span>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="username" required />
        </label>
        <label>
          Email
          <input type="email" name="username2" required />
        </label>
        <label>
          Nombre
          <input type="text" name="name" required />
        </label>
        <label className="labelPassword">
          Contraseña
          <input
            type={showPassword ? "text" : "password"}
            onFocus={() => setShowPassword(false)}
            name="password"
            required
          ></input>
          <button onClick={(e) => handleShowPassword(e)}>
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-eye-closed"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                <path d="M3 15l2.5 -3.8" />
                <path d="M21 14.976l-2.492 -3.776" />
                <path d="M9 17l.5 -4" />
                <path d="M15 17l-.5 -4" />
              </svg>
            )}
          </button>
        </label>
        <div className="errores">
          <ul>
            {errors && errors.map((e, i) => <li key={i}>{e.message}</li>)}
          </ul>
        </div>

        {/* {Object.keys(errors).length > 0 && (
          <div className="errores">
            <ul>
              {Object.keys(errors).map((clave, index) => (
                <li key={index}>{errors[clave]}</li>
              ))}
            </ul>
          </div>
        )} */}

        <button>Registrarse</button>
      </form>
      <small>¿Ya tienes una cuenta?</small>
      <button onClick={() => setMenuToLogin("Login")}>Iniciar Sesión</button>
    </div>
  );
}
