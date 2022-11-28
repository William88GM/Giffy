import { useState, useEffect } from "react";

export function useHistorySearch() {
	const [recents, setRecents] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("HS")) {
			const array = localStorage.getItem("HS").split(","); //Recupera lo guardado en el storage
			setRecents(array);
		}
	}, []);

	function updateHistory(newElement) {
		if (newElement) {
			//Por qué no se elmina el ultimo?
			//if (recents.length === 20) setRecents((prev) => prev.pop());
			// if (recents.length === 20) {
			// 	let sideArray = [...recents];
			// 	sideArray.pop();
			// 	setRecents(sideArray);
			// }

			setRecents((prev) => [newElement, ...recents]);
			localStorage.setItem("HS", [newElement, ...recents]);

			//localStorage.setItem("HS", recents); Por que no funcionaba de esta forma?
			//creo que no llegaba a guardarlo porque la operacion anterior es asincrona
		}
	}

	return {
		updateHistory,
		recents,
	};
}
