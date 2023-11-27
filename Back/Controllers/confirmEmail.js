import { userModel } from "../Models/userModel.js";
import { connectToMongo } from "../mongoDB_connection.js";

export async function confirmEmail(req, res) {
  // const id = req.params.id;
  const token = req.params.token;

  await connectToMongo();

  // const userExist = await userModel.findById(id);
  const userExist = await userModel.findOne({ tokenEmail: token });

  if (userExist) {
    userExist.emailConfirmed = true;
    userExist.tokenEmail = null;
    const savedUser = await userExist.save();

    res.redirect(
      301,
      process.env.side === "production"
        ? "https://giffy-william88gm.vercel.app#logout"
        : "http://localhost:3000#logout"
    );
  } else {
    res.status(404).send();
  }
}
