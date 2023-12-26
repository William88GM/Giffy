import React, { useState } from "react";

export const NoHayMasContext = React.createContext({}); //Creo el contexto

export function NoHayMasContextProvider({ children }) {
  //Toma los hijos de lo que encierra el componente

  const [noHayMas, setNoHayMas] = useState(false); //valor inicial solo para cuando no hay render condicional

  return (
    <NoHayMasContext.Provider value={{ noHayMas, setNoHayMas }}>
      {children}
    </NoHayMasContext.Provider> //Los vuelve a colocar pero en un provider
  );
}

//ContextProvider!=Context.Provider
