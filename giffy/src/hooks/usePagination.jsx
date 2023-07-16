import { useContext, useEffect } from "react";
import { petition } from "../Servicios/call_API";
import { Context } from "../Servicios/Context";
import { contextPage } from "../Servicios/pageContextProvider";
import useFilterRepetitiveGifs from "./useFilterRepetitiveGifs";
import { useParams } from "react-router-dom";
// import { filterRepetitiveGifs } from "./filterRepetitiveGifs";

export default function usePagination({ show }) {
    const { gifs, setGifs } = useContext(Context);
    const { page, setPage } = useContext(contextPage);
    const { search } = useParams();

    useEffect(() => {
        if (!show) return;
        petition(search, page).then((nextGIFS) => {
            //filtrar repetidos aqui?
            setGifs((prev) => prev.concat(nextGIFS));
            setPage((prev) => prev + 1);
            //agregar condicional para que no haga llamadas cuando no hay mas gifs?
        });

        console.log(page);
    }, [show]); //eslint-disable-line
    useFilterRepetitiveGifs();
    // useEffect(() => {
    //     filterRepetitiveGifs({ gifs, setGifs });
    // }, [gifs]);
}
