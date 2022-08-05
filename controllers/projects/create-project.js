import pkg from "mongoose";
const { Types } = pkg;
import { Project, User } from "../../models";

export const createProject = async (req, res) => {
  const newProject = new Project({
    _id: new Types.ObjectId(),
    payslips: [
      { _id: new Types.ObjectId() },
      { _id: new Types.ObjectId() },
      { _id: new Types.ObjectId() },
    ],
  });
  newProject.save();

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      projects: newProject,
    },
  });
  res.json({ project: newProject });
};
