import "./Estilos/App.css";

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./Componentes/Nav";
import ListGifs from "./Componentes/listOfGifs";

function App() {
  const [busqueda, setBusqueda] = useState("");

  function handleSearch(e) {
    setBusqueda(e.target.value);
  }

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/${busqueda}`);
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
      <aside>
        <ul>
          <li>hola</li>
        </ul>
      </aside>
      <footer></footer>
    </>
  );
}

export default App;
