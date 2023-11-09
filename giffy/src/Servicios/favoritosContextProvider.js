import React, { useState } from "react";

export const FavContext = React.createContext({});

export function FavoritosContextProvider({ children }) {
  const [favs, setFavs] = useState([]); //Cuidado con poner algo de valor inicial, ya que luego afecta a los renders condicionales
  return (
    <FavContext.Provider value={{ favs, setFavs }}>
      {children}
    </FavContext.Provider>
  );
}
