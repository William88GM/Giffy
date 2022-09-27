export function petition(keyword, page = 0) {
  let API_URL;
  const key = "W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM";

  if (keyword) {
    API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${keyword}&limit=16&offset=${
      16 * page
    }&rating=g&lang=en`;
  } else {
    API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=12&rating=g`;
  }
  //El problema esta cuando le pido que me devuelva 14 trends o mas
  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      const { data } = res;
      return data.map((elem) => {
        const original = elem.images.original.url;
        const id = elem.id;
        const title = elem.title;
        return { original, id, title };
      });
    });
}
