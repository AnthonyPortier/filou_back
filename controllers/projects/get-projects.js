import { User,Project } from "../../models";

export const getProjects = async (req, res) => {
  const user = await User.findById(req.user._id);
  const projects = await Project.find({
    _id: {
      $in: user.projects,
    },
  });
  res.json({ projects });
};
