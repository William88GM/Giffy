import { Link } from "react-router-dom";
import { Recomendados } from "./Recomendados";

export function Recientes({ setMenuIsActive, list, deleteItem }) {
  function handleClick() {
    window.scroll(0, 0);
    setMenuIsActive(() => false);
  }
  return list ? (
    <aside>
      <span> Búsquedas recientes</span>
      <ul>
        {list.map((el, i) => (
          <li key={i}>
            <Link relative="path" onClick={handleClick} to={"/" + el}>
              {el}
            </Link>
            <button onClick={() => deleteItem(el)}>X</button>
          </li>
        ))}
      </ul>
    </aside>
  ) : (
    <Recomendados setMenuIsActive={setMenuIsActive} />
  );
}
