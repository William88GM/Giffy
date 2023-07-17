import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    connectToMongo();
    const { username, name, password } = req.body;

    const user = new userModel({
        username,
        name,
        passwordHash: password,
    });

    const savedUser = await user.save();
    mongoose.connection.close();
    res.json(savedUser);
});
