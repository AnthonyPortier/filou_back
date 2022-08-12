import { Payslip } from "../../models";
import { findInfosInsidePayslip } from "../../utils/extract_infos/findInfosInsidePayslip";

export const extractWithoutTreatment = async (req, res) => {
  const infos = await findInfosInsidePayslip(req.body);
  console.log(infos, "infos OF PAYSLIP");

  const payslip = await Payslip.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        extractWithoutTreatment: req.body,
        ...infos,
        isLoading: false,
      },
    }
  );
  console.log(payslip, "payslippayslippayslippayslippayslippayslippayslip");
  res.json({ payslip });
};
