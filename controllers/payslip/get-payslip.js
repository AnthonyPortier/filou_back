import { Payslip, Project } from "../../models";

export const getPayslip = async (req, res) => {
  const project = await Project.findById(req.params.id);
  const payslip = project[req.params.index];
  res.json({ payslip });
};
