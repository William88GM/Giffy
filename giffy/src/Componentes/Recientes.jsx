import { Link } from "react-router-dom";
import { useHistorySearch } from "../hooks/HistorySearch";

export function Recientes({ setMenuIsActive }) {
  const { list, deleteItem } = useHistorySearch();

  function handleClick() {
    window.scroll(0, 0);
    setMenuIsActive(() => false);
  }
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
}
