import { Router } from "express";
const clientRouter = Router();
import {create} from "../controllers/clientControllers";

clientRouter.post("/create", create);

export default clientRouter;
