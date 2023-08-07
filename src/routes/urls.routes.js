import { Router } from "express";
import { userValidation } from "../middlewares/userValidation.middleware.js";
import { schemaValidation } from "../middlewares/schemaValidation.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { shortenUrl, getUrlById, redirectToUrl, deleteUrl } from "../controllers/urls.controllers.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", schemaValidation(urlSchema), userValidation, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlRouter.delete("/urls/:id", userValidation, deleteUrl);

export default urlRouter;
