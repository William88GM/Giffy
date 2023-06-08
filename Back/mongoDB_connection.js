import mongoose from "mongoose";
import "dotenv/config";

const connection_string = process.env.connection_string;

export function connectToMongo() {
    return mongoose.connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // .then(() => {
    //     console.log("Conectao!");
    // })
    // .catch((err) => {
    //     console.log("no conectao " + err);
    // });
}
