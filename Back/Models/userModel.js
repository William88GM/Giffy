import mongoose, { Schema } from "mongoose";

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
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;

        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
