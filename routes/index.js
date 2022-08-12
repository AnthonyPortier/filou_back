import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import payslipRoutes from "./payslip";
import projectsRoutes from "./projects";
import projectRoutes from "./project";
import identityRoutes from "./identity";



import { loginRequired } from "../controllers/auth/loginRequired";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", loginRequired, userRoutes);
router.use("/projects", loginRequired, projectsRoutes);
router.use("/project", loginRequired, projectRoutes);
router.use("/payslip", loginRequired, payslipRoutes);
router.use("/identity", loginRequired, identityRoutes);


export default router;
