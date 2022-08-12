import pkg from "mongoose";
const { Schema, model } = pkg;

const schema = new Schema({
  extractWithoutTreatment: { type: Array },
  startDate: { type: String },
  endDate: { type: String },
  category: { type: String },
  coefficient: { type: String },
  level: { type: String },
  siret: { type: String },
  securiteSoc: { type: String },
  job: { type: String },
  brut: { type: String },
  netBeforeTaxes: { type: String },
  mandatorySentence: { type: Boolean },
  isLoading: { type: Boolean, default: false },
  company: { type: Object },
});

export default model("Payslip", schema, "payslips");
