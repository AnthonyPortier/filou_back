import { Router } from "express";
const authRouter = Router();
import { login } from "../controllers/auth/login";
import { register } from "../controllers/auth/register";

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
