import { useContext, useEffect } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import { contextPage } from "../Servicios/pageContextProvider";
import useFilterRepetitiveGifs from "./useFilterRepetitiveGifs";
import { useParams } from "react-router-dom";

export default function useRenderSearch() {
    const { gifs, setGifs } = useContext(Context);
    const { setPage } = useContext(contextPage);

    const { search } = useParams();
    useEffect(() => {
        petition(search).then((arrayGIFS) => {
            if (gifs[0]) {
                //necesitaba que la primera vez no se ejecute
                if (gifs[0].id === arrayGIFS[0].id) return; //Aqui el problema, una vez que se buscó y se cargo una segunda tanda de gifs, al abrir una foto y luego volver a atras no mantiene el array y empieza de nuevo
            }
            setGifs(arrayGIFS);
        });

        return () => setPage(0); //cuando se desmonte el componente...
    }, [search]); //eslint-disable-line
    useFilterRepetitiveGifs();
}
