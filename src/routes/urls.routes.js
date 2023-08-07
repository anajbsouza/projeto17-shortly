import { Router } from "express";
import { userValidation } from "../middlewares/userValidation.middleware.js";
import { shortenUrl, getUrlById, redirectToUrl, deleteUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", userValidation, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlRouter.delete("/urls/:id", deleteUrl);

export default urlRouter;
