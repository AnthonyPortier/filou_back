import { Payslip } from "../../models";

export const extractLoading = async (req, res) => {
  await Payslip.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isLoading: true, imgUrl: req.body.imgUrl } }
  );

  res.json({ isLoading: true });
};
