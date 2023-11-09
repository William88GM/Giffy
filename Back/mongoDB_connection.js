import mongoose from "mongoose";
import "dotenv/config";
// import "dotenv/config"; se le pasó las variables a Render directamente

const connection_string = process.env.connection_string;

export function connectToMongo() {
  return mongoose
    .connect(connection_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectao!");
    })
    .catch((err) => {
      console.log("no conectao " + err);
    });

  process.on("uncaughtException", (error) => {
    console.log(error);
    mongoose.disconnect();
  });
}
