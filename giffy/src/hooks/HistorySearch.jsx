import { useState } from "react";

export function useHistorySearch() {
  const [recents, setRecents] = useState([]);

  function initialRecover() {
    if (localStorage.getItem("HS")) {
      const array = localStorage.getItem("HS").split(","); //Recupera lo guardado en el storage
      setRecents(array);
    }
  }

  function updateHistory(newElement) {
    //Otro dia veo el error
    if (newElement) {
      // if(recents.length===9){

      // }
      setRecents([...recents, newElement]);
      localStorage.setItem("HS", recents); //creo que no llega a guardarlo porque la operacion anterior es asincrona
    }
  }

  return {
    updateHistory,
    recents,
    initialRecover,
  };
}
