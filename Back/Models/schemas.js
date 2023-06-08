import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    original: String,
    title: String,
    date: Date,
    id_giffy: String,
});

export { favoriteSchema };
