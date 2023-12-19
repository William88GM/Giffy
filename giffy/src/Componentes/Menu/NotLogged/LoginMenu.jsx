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
          User
          <input type="text" name="username" required />
        </label>

        <label className="labelPassword">
          Contraseña
          <input
            type={showPassword ? "text" : "password"}
            name="password"
          ></input>
          <button onClick={(e) => handleShowPassword(e)}>👁</button>
        </label>
        {errors ? (
          <small style={{ color: "red" }}>
            Usuario o contraseña incorrectos
          </small>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={loginWithGoogle}
          className="google-button"
        >
          <img src="./google-icon-svg.svg" alt="Ingresar con Google" />
        </button>
        <button type="submit">Iniciar sesión</button>
      </form>
      <small>¿Aún no tienes una cuenta?</small>
      <button onClick={() => setMenuToRegister("Register")}>Registrarse</button>
    </div>
  );
}
