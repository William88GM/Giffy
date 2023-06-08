import Express from "express";
import cors from "cors";
import Axios from "axios";
import { connectToMongo } from "./mongoDB_connection.js";
import { modelsCreation, newFavorite } from "./Models/models.js";
import mongoose from "mongoose";

const App = Express();
App.use(Express.json());
App.use(cors());

const { favoriteModel } = modelsCreation();

App.post("/favoritos/:id", (req, res) => {
    //EXTRACCION DE URL
    const id = req.params.id;
    connectToMongo()
        .then(() => {
            Axios.get(
                //posible paso de más
                `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
            )
                .then((res) => {
                    return {
                        original: res.data.data.images.original.webp,
                        title: res.data.data.title,
                        id_giffy: res.data.data.id,
                    };
                }) //----------------------------------------------------------
                .then((obj) => {
                    const favorite = newFavorite({ favoriteModel, obj });

                    favorite
                        .save()
                        .then((res) => {
                            console.log("guardado en DB" + res);
                        })
                        .catch((err) => {
                            console.log("fallo al guardar en DB" + err);
                        })
                        .finally(() => {
                            mongoose.connection.close();
                        });
                    res.status(201).json(obj).end(); //Si llega a aca,
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).end();
                })
                .finally(() => {
                    // mongoose.connection.close();
                });
        })
        .catch((err) => {
            console.log("no conectao " + err);
        });
});

App.get("/favoritos/all", (req, response) => {
    connectToMongo()
        .then(() => {
            console.log("Conectao!");

            favoriteModel
                .find({})
                .then((res) => {
                    response.json(res);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    mongoose.connection.close();
                });
        })
        .catch((err) => {
            console.log("no conectao " + err);
        });
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
                    // console.error(error);
                    res.status(500).end();
                });
        });
});

App.listen(process.env.port || 3002);
