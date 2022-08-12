import { Project, Payslip, Identity } from "../../models";

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);  
  const payslips = await Payslip.find({
    _id: {
      $in: project.payslips,
    },
  });
  const identity = await Identity.findById(project.identity[0]);
  res.json({ project: { payslips, identity } });
};
