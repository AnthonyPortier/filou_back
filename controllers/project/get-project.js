import { Project } from "../../models";

export const getProject = async (req, res) => {

  const project = await Project.findById(req.params.id);
 
  res.json({ project });
};
