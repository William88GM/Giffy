import { useContext, useEffect } from "react";
import { Context } from "../Servicios/Context";

export default function useFilterRepetitiveGifs() {
    //gifs = [{id,lowRes,original, original_dot_gif, title},{...},{...}]
    const { gifs, setGifs } = useContext(Context);

    useEffect(() => {
        const idsUnicos = {};
        const arrayFiltrado = gifs.filter((objeto) => {
            if (!idsUnicos[objeto.id]) {
                idsUnicos[objeto.id] = true;
                return true;
            }
            return false;
        });

        if (arrayFiltrado.length !== gifs.length) {
            setGifs(arrayFiltrado);
        }
    }, [gifs]);
}
