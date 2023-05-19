import Express from "express";
import cors from "cors";

const App = Express();

App.use(Express.json());
App.use(cors());

App.listen(process.env.port || 3002);
