import { Identity } from "../../models";

export const extractLoading = async (req, res) => {
  await Identity.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isLoading: true, imgUrl: req.body.imgUrl } }
  );
  res.json({ isLoading: true });
};
