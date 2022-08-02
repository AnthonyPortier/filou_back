import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  payslips: [{ type: Schema.Types.ObjectId, ref: "Payslip" }],
  passport: [{ type: Schema.Types.ObjectId, ref: "Passport" }],
});

export default model("Project", schema, "projects");
