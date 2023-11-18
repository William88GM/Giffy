import { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { validateToken } from "../middlewares/validateToken.js";
import {
  validateRegister,
  zodValidateLogin,
} from "../ZodSchemas/zodSchemas.js";

export const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  try {
    await connectToMongo();
    const { username, name, password } = req.body;

    const zodResult = await validateRegister.safeParseAsync({
      username,
      name,
      password,
    });
    if (!zodResult.success) {
      return res.status(400).json(zodResult.error);
    }

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
        name: savedUser.name,
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
            sameSite: process.env.side === "production" ? "none" : "strict",
            secure: process.env.side === "production" ? true : false,
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
    const zodResult = await zodValidateLogin.safeParseAsync({
      username,
      password,
    });
    if (!zodResult.success) {
      return res.status(400).json(zodResult.error);
    }

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
      name: userFound.name,
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
          sameSite: process.env.side === "production" ? "none" : "strict",
          secure: process.env.side === "production" ? true : false,
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

usersRouter.post("/autoLogin", validateToken, async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
});
usersRouter.post("/logout", async (req, res) => {
  // res.cookie("token", "", {
  //   maxAge: 0,
  //   expires: new Date(0),
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: process.env.side === "production" ? true : false,
  // });
  try {
    res.clearCookie("token", {
      maxAge: 0,
      httpOnly: true,
      sameSite: process.env.side === "production" ? "none" : "strict",
      secure: process.env.side === "production" ? true : false,
      // path: "/",
    });
    console.log("LOL");
    res.sendStatus(200).end();
  } catch (error) {
    console.log(error);
  }
});
