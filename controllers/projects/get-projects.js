import { User } from "../../models";

export const getProjects = async (req, res) => {

  const user = await User.findById(req.user._id);

  res.json({ projects: user.projects });
};
