import React from "react";
import { Link } from "react-router-dom";
import { useHistorySearch } from "../hooks/HistorySearch";

export default function Aside() {
    const { list, deleteItem } = useHistorySearch();

    return (
        <aside>
            Búsquedas recientes
            <ul>
                {list.map((el, i) => (
                    <li key={i}>
                        <button onClick={() => deleteItem(i)}>X</button>
                        <Link onClick={window.scroll(0, 0)} to={el}>
                            {el}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
