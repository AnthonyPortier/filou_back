import pkg from "mongoose";
const { Types } = pkg;
import { Client } from "../models";

export const create = (req, res) => {
  const newClient = new Client({
    _id: new Types.ObjectId(),
    name: req.body.name,
    firstname: req.body.firstname,
  });
  newClient.save();
  res.json({ newClient });
};
