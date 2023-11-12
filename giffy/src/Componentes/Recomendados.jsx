import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Recomendados({ setMenuIsActive }) {
  const key = "W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM";
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=9&offset=9&rating=g&bundle=sticker_layering`
    )
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        return data.map((elem) => {
          return elem.title;
        });
      })
      .then((array) => setList(array));
  }, []);

  function handleClick() {
    //prop driling
    window.scroll(0, 0);
    setMenuIsActive(() => false);
  }
  return (
    <aside>
      <span> Más buscados</span>
      <ul>
        {list.map((el, i) => (
          <li key={i}>
            <Link onClick={handleClick} to={el}>
              {el}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
