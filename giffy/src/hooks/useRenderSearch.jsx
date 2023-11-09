import { useContext, useEffect } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import { contextPage } from "../Servicios/pageContextProvider";
import { useParams } from "react-router-dom";

export default function useRenderSearch() {
  const { gifs, setGifs } = useContext(Context);
  const { setPage } = useContext(contextPage);

  const { search } = useParams();

  // function filterGifs(arrayGIFS) {
  //     const idsUnicos = {};

  //     const arrayFiltrado = arrayGIFS.filter((objeto) => {
  //         if (!idsUnicos[objeto.id]) {
  //             idsUnicos[objeto.id] = true;
  //             return true;
  //         }
  //         return false;
  //     });

  //     setGifs(() => arrayFiltrado);
  // }

  useEffect(() => {
    //creo que el problema esta aca, este hook o useEffect se vuelve a crear luego de que se setea el estado desde el usePagination y setea de nuevo el array a los gifs iniciales, y solo ocurre la primera vez porque los use effect se ejecutan solo la primera vez cuando tienen []
    petition(search).then((arrayGIFS) => {
      if (gifs[0]) {
        /*que no se ejecute si ya hay gifs, ocurre un problema al hacer back desde el detalle de un gif
                 Aqui el problema, una vez que se buscó y se cargo una segunda tanda de gifs, al abrir una foto y luego volver a atras no mantiene el array y empieza de nuevo*/
        if (gifs[0].id === arrayGIFS[0].id) return;
      }
      // filterGifs(arrayGIFS);
      setGifs(arrayGIFS);
    });

    return () => setPage(0); //cuando se desmonte el componente...
  }, [search]); //eslint-disable-line
}
