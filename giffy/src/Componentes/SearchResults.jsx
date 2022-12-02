import React from "react";
import ListGifs from "./ListGifs";
import { useParams } from "react-router-dom";

export default function SearchResults() {
	const { search } = useParams();
	return (
		<>
			<h3>{decodeURI(search)}</h3>
			<ListGifs />
		</>
	);
}
