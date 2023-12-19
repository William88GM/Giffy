import mongoose, { Schema } from "mongoose";

const googleUserSchema = new mongoose.Schema({
  username: String,
  name: String,
  photo: String,
  favs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite", //Donde debe buscar las ids
    },
  ],
  history: [String],
});

googleUserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const googleUserModel = mongoose.model("GoogleUser", googleUserSchema);

export { googleUserModel };
