import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./router/auth.routes.js";
import searchRouter from "./router/searchRoutes.js";
import likeRouter from "./router/like.routes.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use([authRouter, searchRouter,likeRouter]);

app.listen(
  port,
  console.log(`Servidor iniciado com sucesso! Na porta: ${port}`)
);
