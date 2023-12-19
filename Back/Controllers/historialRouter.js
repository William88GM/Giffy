import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";
import { googleUserModel } from "../Models/googleUserModel.js";

const historialRouter = Router();

historialRouter.get("/", async (req, res) => {
  const { user } = req;
  await connectToMongo();
  const normalUser = await userModel.findById({ _id: user.id });
  const googleUser = await googleUserModel.findById({ _id: user.id });
  const currentUser = normalUser || googleUser;
  if (currentUser) {
    return res.json({ history: currentUser.history });
  }
  return res.status(404).end();
});

historialRouter.put("/", async (req, res) => {
  const { user } = req;
  const { historyElement } = req.body;
  await connectToMongo();
  const userFound = await userModel.findById({ _id: user.id });
  if (userFound) {
    //normal user
    if (!userFound.history.includes(historyElement)) {
      userFound.history = userFound.history.concat(historyElement);
      const userSaved = await userFound.save();
      console.log(userSaved);
      res.status(201).json({ history: userSaved.history });
    } else {
      res.status(304).end();
    }
  } else {
    //google user
    const userFound = await googleUserModel.findById({ _id: user.id });
    if (!userFound.history.includes(historyElement)) {
      userFound.history = userFound.history.concat(historyElement);
      const userSaved = await userFound.save();
      console.log(userSaved);
      res.status(201).json({ history: userSaved.history });
    } else {
      res.status(304).end();
    }
  }
});

historialRouter.delete("/", async (req, res) => {
  try {
    const { user } = req;
    const { historyElement } = req.body;

    await connectToMongo();
    console.log(req.body);

    const userFound = await userModel.findById({ _id: user.id });
    if (userFound) {
      userFound.history = userFound.history.filter((e) => e !== historyElement);
      const userSaved = await userFound.save();
      console.log(userSaved);
      res.status(201).json({ history: userSaved.history });
    } else {
      const userFound = await googleUserModel.findById({ _id: user.id });
      userFound.history = userFound.history.filter((e) => e !== historyElement);
      const userSaved = await userFound.save();
      console.log(userSaved);
      res.status(201).json({ history: userSaved.history });
    }
  } catch (error) {
    console.log(error);
  }
});

export { historialRouter };
