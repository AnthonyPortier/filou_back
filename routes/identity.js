import { Router } from "express";
const identityRouter = Router();
import { extractWithoutTreatment } from "../controllers/identity/extract-without-treatment-identity";
import { extractLoading } from "../controllers/identity/extract-loading";

identityRouter.post("/extract-without-treatment/:id", extractWithoutTreatment);
identityRouter.put("/extract-loading/:id", extractLoading);

export default identityRouter;
