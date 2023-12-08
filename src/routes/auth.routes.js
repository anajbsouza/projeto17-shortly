import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware.js";
import { schemaUsers, schemaLogin } from "../schemas/users.schema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(schemaUsers), signup);   
authRouter.post("/signin", validateSchemaMiddleware(schemaLogin), login);

export default authRouter;