import "reflect-metadata";
import express from "express";
import routes from "./routes";
import "./database/connect"

//import * as dotenv from "dotenv";
//dotenv.load();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Rodando na porta 3333"));