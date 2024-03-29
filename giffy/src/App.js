import "./Estilos/App.css";
import { Routes, Route } from "react-router-dom";

import Nav from "./Componentes/Nav";
import Aside from "./Componentes/Aside";
import Gif from "./Componentes/Gif";
import { Page404 } from "./Componentes/Page404";
import Trending from "./Componentes/Trending";
import SearchResults from "./Componentes/SearchResults";
import { useContext } from "react";
import { menuContext } from "./Servicios/MenuContext";
import { Toaster } from "react-hot-toast";
import { Recientes } from "./Componentes/Recientes";
import { useOfflineHistory } from "./hooks/useOfflineHistory";
import { Recomendados } from "./Componentes/Recomendados";
import { authContext } from "./Servicios/authContex";

function App() {
  //El bug es al entrar a un gif, luego salir y luego cargar mas gifs, ahi empieza a cargar repetidos
  const { menuIsActive, setMenuIsActive } = useContext(menuContext);
  const { listOffline, deleteItem } = useOfflineHistory();
  const { sesion } = useContext(authContext);
  return (
    <>
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
      <Nav />
      {/* <div className={menuIsActive ? "blur" : "blur_none"}></div> */}

      <div
        onClick={() => setMenuIsActive(false)}
        style={{
          backdropFilter:
            menuIsActive && window.innerWidth > 780 ? "blur(20px)" : "none",
          opacity: menuIsActive && window.innerWidth > 780 ? 1 : 0,
          visibility: menuIsActive ? "visible" : "hidden",
          transition:
            "backdrop-filter 0.2s ease-in, opacity 0.2s ease-in, visibility 0.2s ease-in",
          position: "fixed",
          zIndex: 5,
          top: "50px",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>

      <main>
        <article>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path={`/:search`} element={<SearchResults />} />

            <Route path="/:search/:id" element={<Gif />} />
            <Route path="/favorites/:id" element={<Gif />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </article>
      </main>

      {sesion ? <Recomendados /> : <Aside />}
    </>
  );
}

export default App;
