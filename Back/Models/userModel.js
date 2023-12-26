import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  favs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite", //Donde debe buscar las ids
    },
  ],
  history: [String],
  photo: String,
  emailConfirmed: Boolean,
  tokenEmail: Schema.Types.UUID,
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
