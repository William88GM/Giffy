import { useEffect, useContext } from "react";
import { OfflineHistorialContext } from "../Servicios/offlineHistorialContext";

export function useOfflineHistory() {
  const { listOffline, setListOffline } = useContext(OfflineHistorialContext);
  useEffect(() => {
    if (localStorage.getItem("HS")) {
      const array = localStorage.getItem("HS").split(","); //Recupera lo guardado en el storage
      setListOffline(array);
    }
  }, []); //eslint-disable-line

  function updateHistory(newElement) {
    if (newElement) {
      setListOffline((prev) => [newElement, ...listOffline]);
      localStorage.setItem("HS", [newElement, ...listOffline]);

      //localStorage.setItem("HS", recents); Por que no funcionaba de esta forma?
      //creo que no llegaba a guardarlo porque la operacion anterior es asincrona
    }
  }
  function deleteItem(index) {
    console.log("Llego al delete");
    console.log(index);
    setListOffline((prev) => prev.filter((e, i) => !(e === index)));
    localStorage.setItem(
      "HS",
      listOffline.filter((e, i) => !(e === index))
    );
  }

  return {
    updateHistory,
    listOffline,
    deleteItem,
  };
}
