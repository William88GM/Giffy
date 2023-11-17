import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Servicios/Context";
import useObserver from "../hooks/useObserver";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FavContext } from "../Servicios/favoritosContextProvider";
import useRenderSearch from "../hooks/useRenderSearch";
import usePagination from "../hooks/usePagination";
import { Loading } from "./Loading";
import { authContext } from "../Servicios/authContex";

export default function ListGifs() {
  const [loading, setLoading] = useState(false);
  const { gifs } = useContext(Context);
  const { favs, setFavs } = useContext(FavContext);
  const { sesion } = useContext(authContext);
  const { search } = useParams();
  const [columnas, setColumns] = useState(1);
  const elRef = useRef();
  const { show } = useObserver({ elRef });
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";

  useRenderSearch({ loading, setLoading });
  //Cuando tenga tiempo les implemento el filtro de gifs, el problema que tiene es que no funciona el primer scroll, carga los siguientes gifs pero al instante los elimina y reemplaza con los inicialesm solo ocurre la primera vez
  usePagination({ show });

  function handleFavorite(id) {
    const toastFavId = toast.loading("Guardando...");
    axios
      .post(`${baseURL}/api/favoritos/${id}`, {}, { withCredentials: true })
      .then((res) => {
        if (favs) {
          setFavs((prevFavs) => prevFavs.concat(res.data));
          console.log(res);
          toast.dismiss(toastFavId);
          toast.success("Guardado", {
            iconTheme: {
              primary: "#23272e",
              secondary: "#00ffff",
            },
          });
        }
      })
      .catch((res) => {
        if (res.response.status === 304) {
          toast.dismiss(toastFavId);
          toast.error("Ya guardaste ese gif");
        } else {
          toast.dismiss(toastFavId);
          toast.error("Error al guardar");
        }
      });
  }

  useEffect(() => {
    const updateColumns = () => {
      // Ajusta las reglas de media queries según tus necesidades
      if (window.innerWidth >= 1920) {
        setColumns(6);
      } else if (window.innerWidth >= 1200) {
        setColumns(4);
      } else if (window.innerWidth >= 768) {
        setColumns(3);
      } else if (window.innerWidth >= 340) {
        setColumns(1);
      }
    };

    // Llama a updateColumns al cargar y al cambiar el tamaño de la pantalla
    updateColumns();
    window.addEventListener("resize", updateColumns);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const masonry = Array.from({ length: columnas }, () => []);

  gifs.forEach((enlace, index) => {
    const columna = index % columnas;
    masonry[columna].push(enlace);
  });

  return (
    <>
      <div style={{ display: "flex", minWidth: "100%", padding: "10px" }}>
        <Toaster
          toastOptions={{
            style: {
              background: "#414855",
              color: "#fff",
              // border: "1px solid #00ffff44",
              // boxShadow: "0px 0px 3px 2px #00ffff44",
            },
          }}
        />
        {masonry.map((columna, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              margin: "0 6px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {columna.map((enlace, subIndex) => (
              <div style={{ position: "relative" }}>
                <Link
                  key={subIndex}
                  to={search ? `${enlace.id}` : `trends/${enlace.id}`}
                  style={{ display: "block" }}
                >
                  <img
                    style={{
                      // marginBottom: "8px",
                      height: "min-content",
                      minHeight: "120px",
                      width: "100%",
                      borderRadius: "8px",
                    }}
                    src={enlace.lowRes}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt={enlace.title}
                  />
                </Link>
                {sesion ? (
                  <button
                    title="Añadir a Favoritos"
                    onClick={() => handleFavorite(enlace.id)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      boxShadow: "none",
                      margin: 0,
                    }}
                  >
                    💙
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div ref={elRef}></div>
      {show ? <Loading /> : ""}
    </>
  );
}
