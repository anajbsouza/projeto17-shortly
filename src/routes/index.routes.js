import { Router } from "express";
import userRouter from "./users.routes.js";
import urlRouter from "./urls.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(userRouter);
router.use(urlRouter);
router.use(authRouter);


export default router;