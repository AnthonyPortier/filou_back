import { Router } from "express";
const projectsRouter = Router();
import { getProjects } from "../controllers/projects/get-projects";

projectsRouter.get("/", getProjects);

export default projectsRouter;
