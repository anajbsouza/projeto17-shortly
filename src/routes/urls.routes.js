import { Router } from "express";
import { userAuthenticationMiddleware } from "../middlewares/userAuthentication.middleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { shortenUrl, getUrlById, redirectToUrl, deleteUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchemaMiddleware(urlSchema), userAuthenticationMiddleware, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlRouter.delete("/urls/:id", userAuthenticationMiddleware, deleteUrl);

export default urlRouter;
