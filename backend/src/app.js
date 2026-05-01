import express from "express";
import {createServer } from "node:http";

import  {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io =connectToSocket(server);

app.set("port", (process.env.PORT || 3000));

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async() => {
    const connectionDb = await mongoose.connect("mongodb+srv://2303051050822_db_user:2303051050822_db_user@cluster0.ehnhuyr.mongodb.net/");

    console.log(`mongo connected DB Host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"),() => {
        console.log("Listning on port 3000");
    });

   
}
start();