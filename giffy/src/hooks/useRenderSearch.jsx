import { useContext, useEffect, useState } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import { contextPage } from "../Servicios/pageContextProvider";
import { useParams } from "react-router-dom";

export default function useRenderSearch({ setShow }) {
  const { gifs, setGifs } = useContext(Context); //[]
  const { setPage } = useContext(contextPage);
  const [loading, setLoading] = useState(false);

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

  // useEffect(()=>{
  //   petition(search).then((arrayGIFS) => {
  //     setGifs(arrayGIFS);

  //   })
  // },[])

  useEffect(() => {
    if (!gifs[0]) setLoading(true); //Se ejecuta solo la primera vez
    //este hook o useEffect se vuelve a crear luego de que se setea el estado desde el usePagination y setea de nuevo el array a los gifs iniciales, y solo ocurre la primera vez
    petition(search).then((arrayGIFS) => {
      if (arrayGIFS[0]) {
        if (gifs[0]) {
          /*que no se ejecute si ya estan los mismos gifs, ocurre un problema al hacer back desde el detalle de un gif:
        una vez que se buscó y se cargo una segunda tanda de gifs, al abrir una foto y luego volver a atras 
        no mantiene el array y empieza de nuevo*/

          if (gifs[0].id === arrayGIFS[0].id) {
            console.log("Llegó al if");
            setLoading(false);
            setShow(false);
            return; //Si los gifs que llegan son iguales a los anteriores...
            console.log("aca no deberia llegar");
          }
        }

        console.log(arrayGIFS);
        setGifs(arrayGIFS);
        setLoading(false);
        setShow(false);
      } else {
        setLoading(false);
      }
    });

    return () => setPage(0); //cuando se desmonte el componente...
  }, [search]); //eslint-disable-line

  return { loading };
}
