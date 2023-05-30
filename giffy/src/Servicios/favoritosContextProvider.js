import React, { useState } from "react";

export const FavContext = React.createContext({});

export function FavoritosContextProvider({ children }) {
  const [favs, setFavs] = useState([]);
  return (
    <FavContext.Provider value={{ favs, setFavs }}>
      {children}
    </FavContext.Provider>
  );
}
