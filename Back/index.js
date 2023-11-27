import Express from "express";
import cors from "cors";
import { usersRouter } from "./Controllers/users.js";
import { favoritesRouter } from "./Controllers/favorites.js";
import { downloadsRouter } from "./Controllers/downloads.js";
import "dotenv/config";
import { validateToken } from "./middlewares/validateToken.js";
import cookie_parser from "cookie-parser";
import { historialRouter } from "./Controllers/historialRouter.js";
import { confirmEmail } from "./Controllers/confirmEmail.js";

const App = Express();
App.use(Express.json());
App.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://giffy-gm.vercel.app",
      "https://giffy-william88gm.vercel.app",
      "https://giffy-git-main-william88gm.vercel.app",
    ],
    withCredentials: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
App.use(cookie_parser());

App.get("/api/confirmEmail/:token", confirmEmail);
App.use("/api/users", usersRouter);
App.use("/api/download", downloadsRouter);
App.use("/api/favoritos", validateToken, favoritesRouter);
App.use("/api/historial", validateToken, historialRouter);

App.listen(process.env.port || 3002);
