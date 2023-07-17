import { Router } from "express";
import { userModel } from "../Models/userModel.js";

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;

    const user = new userModel({
        username,
        name,
        passwordHash: password,
    });

    const savedUser = await user.save();
    res.json(savedUser);
});
