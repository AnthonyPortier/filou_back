import pkg from "mongoose";
const { Types } = pkg;
import { Project, User, Payslip, Identity } from "../../models";

export const createProject = async (req, res) => {
  const payslip1 = new Payslip({ _id: new Types.ObjectId(), isLoading: false });
  await payslip1.save();
  const payslip2 = new Payslip({ _id: new Types.ObjectId(), isLoading: false });
  await payslip2.save();
  const payslip3 = new Payslip({ _id: new Types.ObjectId(), isLoading: false });
  await payslip3.save();

  const identity = new Identity({
    _id: new Types.ObjectId(),
    isLoading: false,
  });
  await identity.save();

  const newProject = new Project({
    _id: new Types.ObjectId(),
    payslips: [payslip1, payslip2, payslip3],
    identity,
  });
  await newProject.save();
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      projects: newProject,
    },
  });
  res.json({ project: newProject });
};
