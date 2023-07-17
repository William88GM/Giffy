import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    try {
        await connectToMongo();
        const { username, name, password } = req.body;

        const userSearched = await userModel.find({ username });

        console.log(userSearched);

        if (
            userSearched &&
            userSearched[0] &&
            userSearched[0].username === username
        ) {
            res.status(409).end("Already registered user");
        } else {
            const passwordHash = await bcrypt.hash(password, 10);

            const user = new userModel({
                username,
                name,
                passwordHash,
            });

            const savedUser = await user.save();
            // mongoose.connection.close();
            res.json(savedUser);
        }
    } catch (error) {
        console.log(error);
    }
});
