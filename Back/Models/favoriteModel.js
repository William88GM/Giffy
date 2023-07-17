import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    original: String,
    title: String,
    date: Date,
    id_giffy: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

favoriteModel.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

export { favoriteModel };
