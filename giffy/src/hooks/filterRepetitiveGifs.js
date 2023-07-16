export function filterRepetitiveGifs(gifs, nextGifs, setGifs) {
    const idsUnicos = {};
    console.log(gifs);
    const totalGifs = [...gifs, ...nextGifs];
    const arrayFiltrado = totalGifs.filter((objeto) => {
        if (!idsUnicos[objeto.id]) {
            idsUnicos[objeto.id] = true;
            return true;
        }
        return false;
    });

    if (arrayFiltrado.length !== gifs.length) {
        setGifs(arrayFiltrado);
    }
}
