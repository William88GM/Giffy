import React from "react";
import { Link } from "react-router-dom";
import { useHistorySearch } from "../hooks/HistorySearch";

export default function Aside({ setMenuIsActive, menu }) {
    const { list, deleteItem } = useHistorySearch();

    function handleClick() {
        //prop driling
        window.scroll(0, 0);
        setMenuIsActive(() => false);
    }

    if (menu)
        return (
            <aside>
                <span> Búsquedas recientes</span>
                <ul>
                    {list.map((el, i) => (
                        <li key={i}>
                            <button onClick={() => deleteItem(i)}>X</button>
                            <Link onClick={handleClick} to={el}>
                                {el}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        );
    return (
        <aside>
            <span> Búsquedas recientes</span>
            <ul>
                {list.map((el, i) => (
                    <li key={i}>
                        <button onClick={() => deleteItem(i)}>X</button>
                        <Link onClick={() => window.scroll(0, 0)} to={el}>
                            {el}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
