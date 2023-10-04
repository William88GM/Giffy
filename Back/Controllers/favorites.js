import { Router } from "express";
import { connectToMongo } from "../mongoDB_connection.js";
import Axios from "axios";
import { favoriteModel } from "../Models/favoriteModel.js";
import mongoose from "mongoose";
import { userModel } from "../Models/userModel.js";

const favoritesRouter = Router();

favoritesRouter.post("/:id", async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        await connectToMongo();
        const fullGif = await Axios.get(
            //posible paso de más
            `https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
        );
        const gifToSave = {
            original: fullGif.data.data.images.original.webp,
            title: fullGif.data.data.title,
            id_giffy: fullGif.data.data.id,
        };
        const currentUser = await userModel.findById(userId);

        const favorite = new favoriteModel({
            //Cuando se crea es cuando se filtra el _id
            original: gifToSave.original,
            title: gifToSave.title,
            id_Giphy: gifToSave.id_giffy,
            date: new Date(),
            user: currentUser._id, //que pasa si pongo "userId"?
        });

        let savedFav;

        try {
            //Estaran de mas estos try catch?
            savedFav = await favorite.save();
            console.log("FAVORITO guardado en DB " + savedFav);
            res.status(201).json(savedFav);
        } catch (error) {
            console.log("fallo al guardar en DB el FAVORITO " + error);
        }

        try {
            //Estaran de mas estos try catch?
            //Guardar id de favorito creado en el usuario
            currentUser.favs = currentUser.favs.concat(savedFav.id);
            const userSaved = await currentUser.save();
            console.log("Se agrego al usuario el favorito " + userSaved);
        } catch (error) {
            console.log("fallo al guardar el favorito en el usuario " + error);
        }

        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

favoritesRouter.get("/all", (req, response) => {
    connectToMongo()
        .then(() => {
            console.log("Conectao!");

            favoriteModel
                .find({})
                .populate("user", { username: 1, name: 1, _id: 0 })
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
