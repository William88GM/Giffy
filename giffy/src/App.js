import "./Estilos/App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./Componentes/Nav";
import ListGifs from "./Componentes/listOfGifs";
import Aside from "./Componentes/aside";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [recientes, setRecientes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("aside")) {
      setRecientes(localStorage.getItem("aside").split(","));
    }
  }, []);

  function handleSearch(e) {
    setBusqueda(e.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/${busqueda}`);
    actualizarAside();
  }
  function actualizarAside() {
    //Esto es lo que falta, no actualiza el local Storage no se por que
    setRecientes([...recientes, busqueda]);
    localStorage.clear("aside");
    localStorage.setItem("aside", recientes);
  }
  return (
    <>
      <Nav Search={handleSearch} Submit={handleSubmit} />
      <main>
        <article className="App-content">
          <Routes>
            <Route
              path={`/:search`}
              element={<ListGifs />} /*Cuando esté en barra algo..*/
            />
          </Routes>
        </article>
      </main>
      <Aside array={recientes} />
      <footer></footer>
    </>
  );
}

export default App;
