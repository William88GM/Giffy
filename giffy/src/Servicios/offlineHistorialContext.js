import React, { useState } from "react";

export const OfflineHistorialContext = React.createContext({});

export default function OfflineHistorialContextProvider({ children }) {
  const [listOffline, setListOffline] = useState([]);
  return (
    <OfflineHistorialContext.Provider value={{ listOffline, setListOffline }}>
      {children}
    </OfflineHistorialContext.Provider>
  );
}
