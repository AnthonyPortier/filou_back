import pkg from "mongoose";
import { v4 as uuidv4 } from "uuid";
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
});

export default model("Client", schema, "clients");
