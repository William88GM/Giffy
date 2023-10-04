import mongoose, { Schema } from "mongoose";

const favoriteSchema = new mongoose.Schema({
    original: String,
    title: String,
    date: Date,
    id_Giphy: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

favoriteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        // returnedObject.id = returnedObject._id;
        //En este caso no necesito la id porque en el front se usa la de Giphy

        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);

export { favoriteModel };
