export function petition(keyword, limit) {
  if ((limit <= 0) | (limit === undefined)) limit = 10;

  const key = "W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM";
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${keyword}&limit=${limit}&offset=0&rating=g&lang=en`;

  return fetch(API_URL)
    .then((res) => res.json())
    .then((res) => {
      const { data } = res;
      return data.map((elem) => {
        const original = elem.images.original.url;
        const low = elem.images.fixed_height.url;
        const id = elem.id;
        return { original, low, id };
      });
    });
}
