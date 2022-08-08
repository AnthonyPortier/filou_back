import pkg from "mongoose";
const { Types } = pkg;
import { Project, User, Payslip } from "../../models";

export const createProject = async (req, res) => {
  const payslip1 = new Payslip({ _id: new Types.ObjectId() });
  payslip1.save();
  const payslip2 = new Payslip({ _id: new Types.ObjectId() });
  payslip2.save();
  const payslip3 = new Payslip({ _id: new Types.ObjectId() });
  payslip3.save();

  const newProject = new Project({
    _id: new Types.ObjectId(),
    payslips: [payslip1, payslip2, payslip3],
  });
  newProject.save();

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      projects: newProject,
    },
  });
  res.json({ project: newProject });
};
