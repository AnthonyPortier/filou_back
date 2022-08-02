
import bcrypt from 'bcryptjs';
import pkg from "mongoose";
const { Types } = pkg;
import { User } from "../../models";

export const register = (req, res) => {
  const newUser = new User({
    _id: new Types.ObjectId(),
    name: req.body.name,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
  });
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash;
          newUser.save().then((el) => res.json(el));
        });
      } else {
        res.json("user already exist");
      }
    })
    .catch((err) => {
      return res.status(400).send({
        message: err,
      });
    });
};

