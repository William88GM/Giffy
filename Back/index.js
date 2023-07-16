import Express from "express";
import cors from "cors";
import { usersRouter } from "./Controllers/users.js";
import { favoritesRouter } from "./Controllers/favorites.js";
import { downloadsRouter } from "./Controllers/downloads.js";

const App = Express();
App.use(Express.json());
App.use(cors());

App.use("/users", usersRouter);
App.use("/favoritos", favoritesRouter);
App.use("/download", downloadsRouter);

App.listen(process.env.port || 3002);
