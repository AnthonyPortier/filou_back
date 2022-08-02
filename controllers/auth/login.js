import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "custom-env";
import { User } from "../../models";
env(true);
const secret_key = process.env.SECRET_KEY;

export const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((userLogin) => {
    
      if (userLogin) {
        if (bcrypt.compareSync(req.body.password, userLogin.password)) {
          let token = jwt.sign(JSON.stringify(userLogin), secret_key);
         
          res.send(token);
        }
      } else {
        res.status(401).send("user doesnt exist");
      }
    })
    .catch((err) => res.send(err));
};
