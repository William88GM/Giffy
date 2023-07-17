import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    connectToMongo();
    const { username, name, password } = req.body;

    const userSearched = await ususerModel.find({ username });

    console.log(userSearched);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new userModel({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    // mongoose.connection.close();
    res.json(savedUser);
});
