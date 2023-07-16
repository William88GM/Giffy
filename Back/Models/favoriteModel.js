import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    original: String,
    title: String,
    date: Date,
    id_giffy: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

export { favoriteModel };
