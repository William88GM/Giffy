import React, { useState } from "react";

export const Context = React.createContext({}); //Creo el contexto

export function ContextProvider({ children }) {
  //Toma los hijos de lo que encierra el componente

  const [gifs, setGifs] = useState([]);

  return (
    <Context.Provider value={{ gifs, setGifs }}>{children}</Context.Provider> //Los vuelve a colocar pero en un provider
  );
}

//ContextProvider!=Context.Provider
