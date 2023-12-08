import { Router } from "express"
import { getCurrentUser, getUserRanking } from "../controllers/users.controllers.js"
import { userAuthenticationMiddleware } from "../middlewares/userAuthentication.middleware.js"

const userRouter = Router()

userRouter.get("/users/me", userAuthenticationMiddleware, getCurrentUser)
userRouter.get("/ranking", getUserRanking)

export default userRouter;