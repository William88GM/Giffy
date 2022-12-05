import React, { useState } from "react";

export const HistorialContext = React.createContext({});

export default function HistorialContextProvider({ children }) {
	const [list, setList] = useState([]);
	return (
		<HistorialContext.Provider value={{ list, setList }}>
			{children}
		</HistorialContext.Provider>
	);
}
