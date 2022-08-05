import { Router } from "express";
const projectRouter = Router();
import { getProject } from "../controllers/project/get-project";

projectRouter.get("/:id", getProject);

export default projectRouter;
