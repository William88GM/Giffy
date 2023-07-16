import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    original: String,
    title: String,
    date: Date,
    id_giffy: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Favorite",
        },
    ],
    id_user: String,
});

//-------------------------------------------------------------

[favoriteSchema, userSchema].forEach((schema) => {
    schema.set("toJSON", {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id;
            delete returnedObject._id;
            delete returnedObject.__v;

            if (returnedObject.passwordHash) delete returnedObject.passwordHash;
        },
    });
});

export { favoriteSchema, userSchema };
