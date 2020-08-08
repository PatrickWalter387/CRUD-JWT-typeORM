import { Router } from "express";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import authMiddleware from "./app/middlewares/authMiddleware";

const routes = Router();

routes.post("/users", UserController.store);
routes.post("/auth", AuthController.store);
routes.get("/users", authMiddleware, UserController.index);

export default routes;