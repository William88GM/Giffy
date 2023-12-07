import { Router } from "express";
import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";

const historialRouter = Router();

historialRouter.get("/", async (req, res) => {
  const { user } = req;
  await connectToMongo();
  const userFound = await userModel.findById({ _id: user.id });
  console.log(userFound);
  res.json({ history: userFound.history });
});
historialRouter.put("/", async (req, res) => {
  const { user } = req;
  const { historyElement } = req.body;
  await connectToMongo();
  const userFound = await userModel.findById({ _id: user.id });
  if (!userFound.history.includes(historyElement)) {
    userFound.history = userFound.history.concat(historyElement);
    const userSaved = await userFound.save();
    console.log(userSaved);
    res.status(201).json({ history: userSaved.history });
  } else {
    res.status(304).end();
  }
});
historialRouter.delete("/", async (req, res) => {
  try {
    const { user } = req;
    const { historyElement } = req.body;

    await connectToMongo();
    console.log(req.body);
    const userFound = await userModel.findById({ _id: user.id });

    userFound.history = userFound.history.filter((e) => e !== historyElement);
    const userSaved = await userFound.save();
    console.log(userSaved);
    res.status(201).json({ history: userSaved.history });
  } catch (error) {
    console.log(error);
  }
});

export { historialRouter };
