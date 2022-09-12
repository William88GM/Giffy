import { useState } from "react";

export function useHistorySearch() {
  const [recents, setRecents] = useState([]);

  function initialRecover() {
    if (localStorage.getItem("HS")) {
      setRecents(localStorage.getItem("HS").split(",")); //Recupera lo guardado en el storage
    }
  }

  function updateHistory(newElement) {
    //Otro dia veo el error
    if (newElement) {
      setRecents([...recents, newElement]);
      localStorage.setItem("HS", recents);
    }
  }

  return {
    updateHistory,
    recents,
    initialRecover,
  };
}
