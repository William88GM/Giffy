import "./Estilos/App.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHistorySearch } from "./hooks/HistorySearch";
import Nav from "./Componentes/Nav";
import ListGifs from "./Componentes/ListGifs";
import Aside from "./Componentes/Aside";
import { ContextProvider } from "./Context";
import Gif from "./Componentes/Gif";

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
    navigate(`/${valueSearch}`); //Cambia url, antiguo history?
    updateHistory(valueSearch);
  }

  return (
    <ContextProvider>
      <Nav Search={handleSearch} Submit={handleSubmit} />
      <main>
        <article className="App-content">
          <Routes>
            <Route path={`/:search`} element={<ListGifs />} />

            <Route path=":search/:id" element={<Gif />} />
          </Routes>
        </article>
      </main>
      <Aside recents={recents} />
      <footer></footer>
    </ContextProvider>
  );
}

export default App;
