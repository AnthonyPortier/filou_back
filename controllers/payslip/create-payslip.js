import pkg from "mongoose";
const { Types } = pkg;
import { Project, Payslip } from "../../models";

export const createPayslip = async (req, res) => {
  const {
    startDate,
    endDate,
    company,
    securiteSoc,
    category,
    coefficient,
    level,
    siret,
    job,
    brut,
    netBeforeTaxes,
    mandatorySentence,
  } = req.body;

  const newPayslip = new Payslip({
    _id: new Types.ObjectId(),
    startDate,
    endDate,
    company,
    securiteSoc,
    category,
    coefficient,
    level,
    siret,
    job,
    brut,
    netBeforeTaxes,
    mandatorySentence,
  });
  newPayslip.save();

  await Project.findByIdAndUpdate("62e16de159256e51d86ff354", {
    $push: {
      payslips: newPayslip,
    },
  });
  res.json({ newPayslip });
};
