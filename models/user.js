import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  name: {
    type: String,
    maxlength: 40,
    match: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
  },
  firstname: {
    type: String,
    maxlength: 40,
    match: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i,
  },
  email: {
    type: String,
    required: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
    maxlength: 40,
    minlength: 3,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

export default model("User", schema, "users");
