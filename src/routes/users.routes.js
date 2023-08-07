import { Router } from "express"
import { getCurrentUser, getUserRanking } from "../controllers/users.controllers.js"
import { userValidation } from "../middlewares/userValidation.middleware.js"

const userRouter = Router()

userRouter.get("/users/me", userValidation, getCurrentUser)
userRouter.get("/ranking", getUserRanking)

export default userRouter