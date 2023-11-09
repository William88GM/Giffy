import { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  try {
    await connectToMongo();
    const { username, name, password } = req.body;

    const userSearched = await userModel.find({ username }); //userSearched = [{username:"pepe"}]

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

      const userForToken = {
        id: savedUser._id,
        username: savedUser.username,
      };
      jwt.sign(
        userForToken,
        process.env.tokenENV,
        { expiresIn: "15d" },
        (err, token) => {
          if (err) {
            return (
              res.json({ error: "something went wrong" }), console.log(err)
            );
          }
          res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "development" ? false : true,
          });
          res.status(201).json(savedUser);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await connectToMongo();

    const userFound = await userModel.findOne({ username });
    const passwordIsCorrect =
      userFound === null
        ? false
        : await bcrypt.compare(password, userFound.passwordHash);

    if (!passwordIsCorrect) {
      res.status(401).json({ error: "Invalid password or username" });
    }
    //
    const userForToken = {
      id: userFound._id,
      username: userFound.username,
    };

    jwt.sign(
      userForToken,
      process.env.tokenENV,
      { expiresIn: "15d" },
      (err, token) => {
        if (err) {
          return res.json({ error: "something went wrong" }), console.log(err);
        }
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: "lax",
          // secure: process.env.side === "production" ? true : false,
        });

        res.send({
          name: userFound.name,
          username: userFound.username,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

usersRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });

  return res.sendStatus(200);
});
