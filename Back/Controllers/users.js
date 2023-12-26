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
import { sendEmail } from "../email.js";

export const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  try {
    await connectToMongo();
    const { username, name, password } = req.body;

    const randomProfilePhoto = [
      "https://media1.giphy.com/media/12HZukMBlutpoQ/giphy.webp?cid=c2c5bb03k9tghb52o9ewngv0zzx7ou7w99z0ntdaaa72ho0t&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media0.giphy.com/media/jTnGaiuxvvDNK/giphy.webp?cid=c2c5bb03k9tghb52o9ewngv0zzx7ou7w99z0ntdaaa72ho0t&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media3.giphy.com/media/JIX9t2j0ZTN9S/giphy.webp?cid=c2c5bb03zeo5fc7jlicy7ejh2in79h6oi77c302ajb735l33&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media4.giphy.com/media/Zx1ZEctOOvxK5VCwwE/giphy.webp?cid=c2c5bb035o4ii8s0qm1gebg0wps632ya8jggdw4hlsr4nxos&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media2.giphy.com/media/ewzF6uunnPn6L5amuW/giphy.webp?cid=c2c5bb03uojp6qdpcbuv8vt4heafpiziqg6k7yqnmebvb1t3&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media3.giphy.com/media/uSYQsJQWEv6O4/giphy.webp?cid=c2c5bb03uojp6qdpcbuv8vt4heafpiziqg6k7yqnmebvb1t3&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media2.giphy.com/media/Cmr1OMJ2FN0B2/giphy.webp?cid=c2c5bb03yeat0kgokyxvywb22z6vj1r7hs5wnlizh2i85sml&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media4.giphy.com/media/1pooFlqcmEz9AgNeRZ/giphy.webp?cid=c2c5bb03o7rqh8r4ywp6di47by3grncd1vggfhloqjgl7yf6&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media0.giphy.com/media/Md053RIVMG3Re/giphy.webp?cid=c2c5bb0379fbdwhmfle4bfcykha2b9xcf54m4ws98ajwnbfj&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      "https://media2.giphy.com/media/11J027GnyjrcJi/giphy.webp?cid=c2c5bb03c9hdgrmdex1b9woalb5qr2y54ogst3pcdtp77bpt&ep=v1_gifs_search&rid=giphy.webp&ct=g",
    ];

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
        photo: randomProfilePhoto[Math.floor(Math.random() * 9)] || undefined,
        emailConfirmed: false,
        tokenEmail: globalThis.crypto.randomUUID(),
      });

      const savedUser = await user.save();
      console.log("usuarioGuardado: " + savedUser._id);

      const userForToken = {
        id: savedUser._id,
        username: savedUser.username, //Email
        name: savedUser.name,
        photo: savedUser.photo,
        emailConfirmed: savedUser.emailConfirmed,
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
            maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
            httpOnly: true,
            sameSite: process.env.side === "production" ? "none" : "strict",
            secure: process.env.side === "production" ? true : false,
          });
          res.status(201).json({
            username: savedUser.username, //Email
            name: savedUser.name,
            emailConfirmed: savedUser.emailConfirmed,
          });
        }
      );

      const emailResult = await sendEmail({
        to: username,
        token: savedUser.tokenEmail,
      });
      // console.log(emailResult);
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
        : bcrypt.compare(password, userFound.passwordHash);

    if (!passwordIsCorrect) {
      return res.status(401).json({ error: "Invalid password or username" });
    }
    //
    const userForToken = {
      id: userFound._id,
      username: userFound.username,
      name: userFound.name,
      emailConfirmed: userFound.emailConfirmed,
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
          emailConfirmed: userFound.emailConfirmed,
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
