import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  startDate: { type: String },
  endDate: { type: String },
  company: { type: Object },
  securiteSoc: { type: String },
  category: { type: String },
  coefficient: { type: String },
  level: { type: String },
  siret: { type: String },
  job: { type: String },
  brut: { type: String },
  netBeforeTaxes: { type: String },
  mandatorySentence: { type: Boolean },
});

export default model("Payslip", schema, "payslips");
