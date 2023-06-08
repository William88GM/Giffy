import mongoose from "mongoose";
import { favoriteSchema } from "./schemas.js";

export function modelsCreation() {
    const favoriteModel = mongoose.model("favorite", favoriteSchema);

    return { favoriteModel };
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
