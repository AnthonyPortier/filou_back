import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  payslips: [{ type: Schema.Types.ObjectId, ref: "Payslip" }],
  identity: [{ type: Schema.Types.ObjectId, ref: "Identity" }],
});

export default model("Project", schema, "projects");
