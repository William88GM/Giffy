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
    id_user: String,
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
