import Axios from "axios";
import { Router } from "express";

export const downloadsRouter = Router();

downloadsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    Axios.get(
        //Pido el link a Giphy
        `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
    )
        .then((res) => {
            return {
                original: res.data.data.images.original.url,
                title: res.data.data.title,
            };
        })
        .then((obj) => {
            //Usando el link pido el estatico a Giphy en forma de "arrayBuffer"
            Axios.get(obj.original, { responseType: "arraybuffer" })
                .then((staticImg) => {
                    res.attachment(`${obj.title}.gif`); //Aca le digo wacho lo que te va a llegar tenes que descargarlo y con este nombre
                    res.send(staticImg.data); //Envio el estatico
                })
                .catch((error) => {
                    // console.error(error);
                    res.status(500).end();
                });
        });
    /* al establecer la cabecera Content-Disposition con res.attachment() 
    y enviar los datos de la imagen con res.send(), se configura la respuesta del servidor
     para que el navegador descargue la imagen en lugar de mostrarla directamente. */
});
