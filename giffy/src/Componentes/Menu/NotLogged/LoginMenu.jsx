import { useContext, useEffect, useState } from "react";
import { authContext } from "../../../Servicios/authContex";
import axios from "axios";
import { LoadingGif } from "../LoadingGif";

import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
export function LoginMenu({ setMenuToRegister }) {
  const firebaseConfig = {
    apiKey: "AIzaSyDA2_VjuRZaqmycLItVXYRA9n9luqXhkD0",
    authDomain: "giffy-5f3c7.firebaseapp.com",
    projectId: "giffy-5f3c7",
    storageBucket: "giffy-5f3c7.appspot.com",
    messagingSenderId: "80370880418",
    appId: "1:80370880418:web:0534e7cd1328725fb46cfb",
    measurementId: "G-W6Y6DR9CT7",
  };
  const appFireBase = initializeApp(firebaseConfig);

  const { setSesion } = useContext(authContext);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  const fromGoogle = localStorage.getItem("fromGoogle");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { username, password } = Object.fromEntries(formData.entries());
    setLoading(true);
    axios
      .post(
        `${baseURL}/api/users/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.status === 200) {
          setSesion(res.data);
          setErrors(false);
        }
      })
      .catch((res) => {
        setLoading(false);
        if (res.response.status === 401) {
          setErrors(true);
          console.log(errors);
        }
      });
  }

  function handleShowPassword(e) {
    setShowPassword(!showPassword);
    e.preventDefault();
  }

  function loginWithGoogle() {
    console.log("aqui vamos");
    localStorage.setItem("fromGoogle", "true"); //Habra una mejor forma?
    const provider = new GoogleAuthProvider(appFireBase);
    const auth = getAuth(appFireBase);
    signInWithRedirect(auth, provider);
  }

  useEffect(() => {
    if (fromGoogle === "true") {
      setLoading(true);
      localStorage.setItem("fromGoogle", "false");
    }

    const auth = getAuth(appFireBase);

    getRedirectResult(auth)
      .then((result) => {
        console.log(result);
        if (result) {
          console.log("llego aqui");
          console.log(result);
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          // const user = result.user;
          // console.log("token:  " + token);

          const userInfo = getAdditionalUserInfo(result);
          const user = {
            email: userInfo.profile.email,
            name: userInfo.profile.name,
            photo: userInfo.profile.picture,
            isNewUser: userInfo.isNewUser,
            id_google: userInfo.profile.id,
          };

          console.log(user);
          axios
            .post(
              `${baseURL}/api/loginWithGoogle`,
              { user },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res.data);
              console.log("el back responde");
              setLoading(false);
              setSesion(res.data);
              setErrors(false);
            })
            .catch((res) => {
              setLoading(false);
              setErrors(true);
              console.log(errors);
            });

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }
      })
      .catch((error) => {
        // Handle Errors here.
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
      });
  }, []);

  return loading ? (
    <LoadingGif />
  ) : (
    <div className="LoginMenu">
      <span>¡Hola de nuevo!</span>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario
          <input type="text" name="username" required />
        </label>

        <label className="labelPassword">
          Contraseña
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            style={{ backgroundColor: "#282c34" }}
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
        {errors ? (
          <small style={{ color: "red" }}>
            Usuario o contraseña incorrectos
          </small>
        ) : (
          ""
        )}
        <button type="submit">Iniciar sesión</button>
        <button
          type="button"
          onClick={loginWithGoogle}
          className="google-button"
        >
          <svg
            width="36px"
            height="36px"
            viewBox="-3 0 262 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          Continuar con Google
        </button>
      </form>
      <small>¿Aún no tienes una cuenta?</small>
      <button onClick={() => setMenuToRegister("Register")}>Registrarse</button>
    </div>
  );
}
