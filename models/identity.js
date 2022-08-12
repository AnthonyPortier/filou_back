import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  extractWithoutTreatment: { type: Array },
  isLoading: { type: Boolean, default: false },
  name: { type: String },
  firstName: { type: String },
  imgUrl: { type: String },
});

export default model("Identity", schema, "identities");
