import { Router } from "express";
import { connectToMongo } from "../mongoDB_connection.js";
import Axios from "axios";
import { favoriteModel } from "../Models/favoriteModel.js";
import mongoose from "mongoose";

const favoritesRouter = Router();

favoritesRouter.post("/:id", (req, res) => {
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
                    const favorite = new favoriteModel({
                        original: obj.original,
                        title: obj.title,
                        id_giffy: obj.id_giffy,
                        date: new Date(),
                    });

                    favorite
                        .save()
                        .then((res) => {
                            console.log("guardado en DB" + res);
                        })
                        .catch((err) => {
                            console.log("fallo al guardar en DB" + err);
                            //res.status...?
                        })
                        .finally(() => {
                            // mongoose.connection.close();
                        });
                    res.status(201).json(obj).end(); //Si llega a aca,
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).end();
                });
        })
        .catch((err) => {
            console.log("no conectao " + err);
        });
});

favoritesRouter.get("/all", (req, response) => {
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
                    // mongoose.connection.close();
                });
        })
        .catch((err) => {
            console.log("no conectao " + err);
        });
});

export { favoritesRouter };
