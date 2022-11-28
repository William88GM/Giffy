import React from "react";
import { Link } from "react-router-dom";

export default function Aside({ recents = [] }) {
	recents.reverse(); //<- no funciona
	return (
		<aside>
			Busquedas recientes
			<ul>
				{recents.map((e, i) => (
					<li key={i}>
						<Link onClick={window.scroll(0, 0)} to={e}>
							{e}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
