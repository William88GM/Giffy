import mongoose from "mongoose";
import { favoriteSchema, userSchema } from "./schemas.js";

export function modelsCreation() {
    const favoriteModel = mongoose.model("Favorite", favoriteSchema);

    const userModel = mongoose.model("User", userSchema);

    return { favoriteModel, userModel };
}
//---------------------------------------------------------------------------------------------------

export function newFavorite({ favoriteModel, obj }) {
    const favorite = new favoriteModel({
        original: obj.original,
        title: obj.title,
        id_giffy: obj.id_giffy,
        date: new Date(),
    });

    return favorite;
}

//Esta forma requiere que se le pase el modelo por parametros al router
// const { favoriteModel } = modelsCreation(); <-- dentro de index.js
