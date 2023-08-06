import { Router } from "express";
import { userValidation } from "../middlewares/userValidation.middleware.js";
import { shortenUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", userValidation, shortenUrl);

export default urlRouter;
