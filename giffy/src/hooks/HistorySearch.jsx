import { useEffect, useContext } from "react";
import { HistorialContext } from "../Servicios/historialContext";

export function useHistorySearch() {
	const { list, setList } = useContext(HistorialContext);
	useEffect(() => {
		if (localStorage.getItem("HS")) {
			const array = localStorage.getItem("HS").split(","); //Recupera lo guardado en el storage
			setList(array);
		}
	}, []); //eslint-disable-line

	function updateHistory(newElement) {
		if (newElement) {
			setList((prev) => [newElement, ...list]);
			localStorage.setItem("HS", [newElement, ...list]);

			//localStorage.setItem("HS", recents); Por que no funcionaba de esta forma?
			//creo que no llegaba a guardarlo porque la operacion anterior es asincrona
		}
	}
	function deleteItem(index) {
		setList((prev) => prev.filter((e, i) => !(i === index)));
		localStorage.setItem(
			"HS",
			list.filter((e, i) => !(i === index))
		);
	}

	return {
		updateHistory,
		list,
		deleteItem,
	};
}
