import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { schemaUsers, schemaLogin } from "../schemas/users.schema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(schemaUsers), signup);   
authRouter.post("/login", schemaValidation(schemaLogin), login);

export default authRouter;