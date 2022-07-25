import { Router } from "express";
import clientRoutes from "./client";
const router = Router();

router.use("/client", clientRoutes);

export default router;

