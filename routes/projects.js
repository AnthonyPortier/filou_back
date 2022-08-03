import { Router } from "express";
const projectsRouter = Router();
import { getProjects } from "../controllers/projects/get-projects";
import { createProject } from "../controllers/projects/create-project";


projectsRouter.get("/", getProjects);
projectsRouter.post("/create", createProject);


export default projectsRouter;
