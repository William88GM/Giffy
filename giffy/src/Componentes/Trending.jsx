import React from "react";
import ListGifs from "./ListGifs";

export default function Trending() {
	return (
		<>
			<h3>🔥 Tendencias 🔥</h3>
			<ListGifs pagination={false} />
		</>
	);
}
