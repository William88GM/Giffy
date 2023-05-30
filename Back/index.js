import Express from "express";
import cors from "cors";
import Axios from "axios";

const App = Express();

App.use(Express.json());
App.use(cors());

const favs = [
  //   {
  //     original:
  //       "https://media0.giphy.com/media/EZICHGrSD5QEFCxMiC/giphy.gif?cid=c2c5bb03p4qfeq8hsbsbzb633924f848wagnl7p7ov4dgkn4&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
  //     title: "",
  //   }
];

App.post("/favoritos/:id", (req, res) => {
  //EXTRACCION DE URL
  const id = req.params.id;
  Axios.get(
    `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
  )
    .then((res) => {
      return {
        original: res.data.data.images.original.webp,
        title: res.data.data.title,
        id: res.data.data.id,
      };
    })
    .then((obj) => {
      favs.push(obj);
      res.status(201).json(obj).end();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).end();
    });
  //mejor pushear el link directo
});

App.get("/favoritos/all", (req, res) => {
  res.json(favs);
});

//ESTO ES OROOOOOOOOOOO
App.get("/download/:id", (req, res) => {
  const id = req.params.id;
  Axios.get(
    `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
  )
    .then((res) => {
      return {
        original: res.data.data.images.original.url,
        title: res.data.data.title,
      };
    })
    .then((obj) => {
      Axios.get(obj.original, { responseType: "arraybuffer" })
        .then((img) => {
          res.attachment(`${obj.title}.gif`);
          res.send(img.data);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).end();
        });
    });
});

App.listen(process.env.port || 3002);
