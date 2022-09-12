import "./Estilos/App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistorySearch } from "./hooks/HistorySearch";
import Nav from "./Componentes/Nav";
import ListGifs from "./Componentes/ListGifs";
import Aside from "./Componentes/Aside";

function App() {
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();
  const { updateHistory, initialRecover, recents } = useHistorySearch();

  useEffect(() => {
    initialRecover();
  }, []); //eslint-disable-line

  function handleSearch(evt) {
    setValueSearch(evt.target.value); //Actualiza el valor del input
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    navigate(`/${valueSearch}`); //Cambia url, antiguo history
    updateHistory(valueSearch);
  }

  return (
    <>
      <Nav Search={handleSearch} Submit={handleSubmit} />
      <main>
        <article className="App-content">
          <Routes>
            <Route path={`/:search`} element={<ListGifs />} />
          </Routes>
        </article>
      </main>
      <Aside recents={recents} />
      <footer></footer>
      <img src="" alt="logo" />
    </>
  );
}

export default App;
