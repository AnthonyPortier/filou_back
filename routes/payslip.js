import { Router } from "express";
const payslipRouter = Router();
import { addPayslip } from "../controllers/payslip/add-payslip";

payslipRouter.post("/add-payslip", addPayslip);

export default payslipRouter;
