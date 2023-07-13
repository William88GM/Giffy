export function petition(keyword, page = 0) {
    let API_URL;
    const key = "W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM";

    if (keyword) {
        API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${keyword.replace(
            /\s/g,
            "+"
        )}&limit=9&offset=${9 * page}&rating=g&lang=en&bundle=sticker_layering`;
    } else {
        API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=9&offset=${
            9 * page
        }&rating=g&bundle=sticker_layering`;
    }

    //La api a veces manda gifs repetidos

    return fetch(API_URL)
        .then((res) => res.json())
        .then((res) => {
            const { data } = res;
            return data.map((elem) => {
                // if(gifs)   //Saltear gif repetido
                const original = elem.images.original.webp;
                const original_dot_gif = elem.images.original.url;
                const lowRes = elem.images.fixed_height_downsampled.webp;
                const id = elem.id;
                const title = elem.title;
                return { original, original_dot_gif, lowRes, id, title };
            });
        });
}
//elem.images.fixed_height_downsampled.url
