import { removeAllExeptNumbers, get2Decimals } from "../stringTreatments";

export const findBrut = (text) => {
  return (
    text &&
    get2Decimals(
      removeAllExeptNumbers(
        text.split("brut").filter((el) => Number(el.charAt(0)))[0]
      )
    )
  );
};
