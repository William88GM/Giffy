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
import { NoHayMasContext } from "../Servicios/NoHayMasContextProvider";

export default function ListGifs() {
  const { gifs } = useContext(Context);
  const { favs, setFavs } = useContext(FavContext);
  const { sesion } = useContext(authContext);
  const { noHayMas } = useContext(NoHayMasContext);
  const { search } = useParams();
  const [columnas, setColumns] = useState(1);
  const elRef = useRef();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      // : "https://giffy-back.onrender.com";
      :"https://giffybackindependiente-william88gms-projects.vercel.app";

  const { show, setShow } = useObserver({ elRef });

  const { loading } = useRenderSearch({ setShow }); //aqui problema re renders

  //Cuando tenga tiempo les implemento el filtro de gifs, el problema que tiene es que no funciona el primer scroll, carga los siguientes gifs pero al instante los elimina y reemplaza con los inicialesm solo ocurre la primera vez

  usePagination({ show });

  function handleFavorite(id) {
    const toastFavId = toast.loading("Guardando...");
    axios
      .post(`${baseURL}/api/favoritos/${id}`, {}, { withCredentials: true })
      .then((res) => {
        if (favs) {
          setFavs((prevFavs) => prevFavs.concat(res.data));
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

    updateColumns();
    window.addEventListener("resize", updateColumns);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const masonry = Array.from({ length: columnas }, () => []); //Crear un array cuyo largo sera la cantidad de columnas

  gifs.forEach((enlace, index) => {
    //Repartir gifs en las diferentes columnas
    const columna = index % columnas;
    masonry[columna].push(enlace);
  });

  return loading ? (
    <h5>Cargando...</h5>
  ) : gifs[0] ? (
    <>
      <div style={{ display: "flex", minWidth: "100%", padding: "10px" }}>
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
              <div style={{ position: "relative" }} key={subIndex}>
                <Link
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

            <div ref={elRef}></div>
            {!noHayMas && show ? <Loading /> : ""}
          </div>
        ))}
      </div>
      {/* <div ref={elRef}></div>
      {loading && (show ? <Loading /> : "")} */}
    </>
  ) : (
    <h5>Sin resultados</h5>
  );
}
