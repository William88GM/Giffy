import { useContext, useEffect } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import { contextPage } from "../Servicios/pageContextProvider";
import { useParams } from "react-router-dom";

export default function usePagination({ show }) {
  const { gifs, setGifs } = useContext(Context);
  const { page, setPage } = useContext(contextPage);
  const { search } = useParams();

  async function callConcatAndFilterGifs() {
    const nextGIFS = await petition(search, page);
    await setPage((prev) => prev + 1);
    // setGifs((prev) => prev.concat(nextGIFS));

    //.............FILTRO DE GIFS REPETIDOS al scrollear..............
    const concatedGifs = [...gifs, ...nextGIFS];
    const idsUnicos = {};
    const arrayFiltrado = concatedGifs.filter((objeto) => {
      if (!idsUnicos[objeto.id]) {
        idsUnicos[objeto.id] = true;
        return true;
      }
      return false;
    });
    setGifs(() => arrayFiltrado);
  }

  useEffect(() => {
    if (!show) return;
    callConcatAndFilterGifs();
    console.log(page);
  }, [show]); //eslint-disable-line
}
