import { Router } from "express";
const payslipRouter = Router();
import { getPayslip } from "../controllers/payslip/get-payslip";
import { extractWithoutTreatment } from "../controllers/payslip/extract-without-treatment-payslip";
import { createPayslip } from "../controllers/payslip/create-payslip";
import { extractLoading } from "../controllers/payslip/extract-loading";


payslipRouter.get("/get-payslip/:id/:index", getPayslip);
payslipRouter.post("/extract-without-treatment/:id", extractWithoutTreatment);
payslipRouter.put("/extract-loading/:id", extractLoading);

////////////////////////////
payslipRouter.post("/create-payslip", createPayslip);

export default payslipRouter;
