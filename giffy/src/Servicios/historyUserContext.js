import { createContext, useState } from "react";

export const historyUserContext = createContext();

export function HistoryUserContextProvider({ children }) {
  const [listUser, setListUser] = useState([]);

  return (
    <historyUserContext.Provider value={{ listUser, setListUser }}>
      {children}
    </historyUserContext.Provider>
  );
}
