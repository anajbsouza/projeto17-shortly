import { Router } from "express";
import { login, signup } from "../controllers/users.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { schemaUsers, schemaLogin } from "../schemas/users.schema.js";

const userRouter = Router();

userRouter.post("/signup", schemaValidation(schemaUsers), signup);   
userRouter.post("/login", schemaValidation(schemaLogin), login);

export default userRouter;