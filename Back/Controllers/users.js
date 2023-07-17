import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";
import bcript from "bcript";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    connectToMongo();
    const { username, name, password } = req.body;

    const passwordHash = await bcript.hash(password, 10);

    const user = new userModel({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    mongoose.connection.close();
    res.json(savedUser);
});
