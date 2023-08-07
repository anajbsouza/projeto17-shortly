import { Router } from "express";
import { userValidation } from "../middlewares/userValidation.middleware.js";
import { shortenUrl, getUrlById, redirectToUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", userValidation, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);

export default urlRouter;
