import React, { useState } from "react";

export const authContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [sesion, setSesion] = useState(false);

  return (
    <authContext.Provider value={{ sesion, setSesion }}>
      {children}
    </authContext.Provider>
  );
}
