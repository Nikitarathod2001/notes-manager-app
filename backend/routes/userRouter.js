import express from "express";
import { getUserData, userLogin, userRegister } from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/get-userdata", authUser, getUserData);

export default userRouter;