import { Router } from "express";
import { connectToMongo } from "../mongoDB_connection.js";
import Axios from "axios";
import { favoriteModel } from "../Models/favoriteModel.js";
import mongoose, { mongo } from "mongoose";
import { userModel } from "../Models/userModel.js";

const favoritesRouter = Router();

favoritesRouter.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { user } = req;

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

    const currentUser = await userModel.findById(user.id);
    if (!currentUser) return res.status(401).end();

    const uniqueFav = await favoriteModel.findOne({ id_Giphy: id });
    if (uniqueFav && currentUser.favs.includes(uniqueFav.id)) {
      return res.status(304).json({ error: "Ya tenes ese chromo prro" });
    }

    if (uniqueFav) {
      //Si ya existe ese fav en db usamos ese

      currentUser.favs = currentUser.favs.concat(uniqueFav.id);
      const userSaved = await currentUser.save();
      uniqueFav.user = uniqueFav.user.concat(currentUser.id);
      const favUpdated = await uniqueFav.save();

      console.log("Se enlazo el favorito al usuario " + userSaved + favUpdated);

      return res.status(201).json(uniqueFav);
    } else {
      //si no existe el fav en db lo creamos
      const favorite = new favoriteModel({
        original: gifToSave.original,
        title: gifToSave.title,
        id_Giphy: gifToSave.id_giffy,
        date: new Date(),
        user: currentUser._id,
        // user: currentUser.toJSON().id
        // user: user.id
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
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

favoritesRouter.get("/all", (req, response) => {
  const { user } = req;

  connectToMongo()
    .then(() => {
      console.log("Conectao!");

      favoriteModel
        .find({ user: user.id })
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

favoritesRouter.delete("/:id", async (req, res) => {
  try {
    await connectToMongo();
    const gif = req.params.id;
    const { user } = req;

    const currentUser = await userModel.findById(user.id);
    // console.log("id usuario actual " + currentUser._id);
    // console.log("favs del usuario " + currentUser.favs);

    const currentFav = await favoriteModel.findOne({ id_Giphy: gif });
    // console.log("id favorito actual " + currentFav._id);
    // console.log("usuarios del fav " + currentFav.user);

    if (currentUser) {
      currentUser.favs = currentUser.favs.filter(
        (e) => e.toString() !== currentFav._id.toString()
      );
      const savedUser = await currentUser.save();
      // console.log(
      //   "favs del usuario luego de eliminar el fav " + currentUser.favs
      // );

      currentFav.user = currentFav.user.filter(
        (e) => e.toString() !== currentUser._id.toString()
      );
      const savedFavs = await currentFav.save();
      // console.log(
      //   "usuarios del fav luego de quitar el user " + currentFav.user
      // );

      const favsListos = await currentUser.populate("favs", {
        user: 0,
        _id: 0,
        __v: 0,
      });
      console.log("favs a devolver" + favsListos.favs);
      res.status(200).json(favsListos.favs);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

//lambda que se fije de vezz en cuando si existe de la collecion favs  algun gif que ya no lo tenga nadie y lo elimine
export { favoritesRouter };
