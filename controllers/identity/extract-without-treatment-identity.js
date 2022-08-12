import { Identity } from "../../models";
import { findInfosInsideIdentity } from "../../utils/extract_infos/findInfosInsideIdentity";

export const extractWithoutTreatment = async (req, res) => {
  const infos = await findInfosInsideIdentity(req.body);
  console.log(infos, "infos OF IDENTITY");

  const identity = await Identity.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        extractWithoutTreatment: req.body,
        ...infos,
        isLoading: false,
      },
    }
  );
  console.log(identity, "iiiiiiiiiiiiiidentity");
  res.json({ identity });
};
