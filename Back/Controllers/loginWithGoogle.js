import jwt from "jsonwebtoken";
import { connectToMongo } from "../mongoDB_connection.js";

import { Router } from "express";
import { googleUserModel } from "../Models/googleUserModel.js";
import {
  validateGoogleRegister,
  validateRegister,
  zodGoogleValidateLogin,
} from "../ZodSchemas/zodSchemas.js";

export const loginWithGoogleRouter = Router();

loginWithGoogleRouter.post("/", async (req, res) => {
  const { email, name, isNewUser, photo, id_google } = req.body.user;
  //usar datos encriptados

  const username = email;

  if (isNewUser) {
    //Registro

    try {
      await connectToMongo();

      const zodResult = await validateGoogleRegister.safeParseAsync({
        username,
        name,
      });
      if (!zodResult.success) {
        return res.status(400).json(zodResult.error);
      }

      const user = new googleUserModel({
        username: email,
        name,
        photo,
        id_google: id_google,
        emailConfirmed: true,
      });

      const savedUser = await user.save();
      console.log("usuarioGuardado: " + savedUser._id);

      const userForToken = {
        id: savedUser._id,
        username: savedUser.username, //Email
        name: savedUser.name,
        photo: savedUser.photo,
        id_google: id_google,
        emailConfirmed: true,
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
            photo: savedUser.photo,
            emailConfirmed: true,
          });
        }
      );
      // console.log(emailResult);
    } catch (error) {
      console.log(error);
    }
  } else {
    //Login
    try {
      await connectToMongo();

      const userFound = await googleUserModel.findOne({ username });
      if (!userFound) return res.status(400).end();
      const zodResult = await zodGoogleValidateLogin.safeParseAsync({
        username,
      });
      if (!zodResult.success) {
        return res.status(400).json(zodResult.error);
      }

      //
      const userForToken = {
        id: userFound._id,
        username: userFound.username,
        name: userFound.name,
        emailConfirmed: true,
        photo,
        id_google: id_google,
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

          res.send({
            name: userFound.name,
            username: userFound.username,
            emailConfirmed: true,
            photo,
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});
