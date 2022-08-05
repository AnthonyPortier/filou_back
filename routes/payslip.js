import { Router } from "express";
const payslipRouter = Router();
import { createPayslip } from "../controllers/payslip/create-payslip";
import { getPayslip } from "../controllers/payslip/get-payslip";

payslipRouter.get("/get-payslip/:id/:index", getPayslip);

////////////////////////////
payslipRouter.post("/create-payslip", createPayslip);

export default payslipRouter;
