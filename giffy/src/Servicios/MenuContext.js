import { createContext, useState } from "react";

export const menuContext = createContext();

export function MenuContextProvider({ children }) {
    const [menuIsActive, setMenuIsActive] = useState(false);

    return (
        <menuContext.Provider value={{ menuIsActive, setMenuIsActive }}>
            {children}
        </menuContext.Provider>
    );
}
