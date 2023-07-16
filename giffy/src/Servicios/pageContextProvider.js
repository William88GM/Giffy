import React, { useState } from "react";

export const contextPage = React.createContext({});

export default function PageContextProvider({ children }) {
    const [page, setPage] = useState(0);
    return (
        <contextPage.Provider value={{ page, setPage }}>
            {children}
        </contextPage.Provider>
    );
}
