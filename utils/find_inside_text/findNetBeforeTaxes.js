import { removeAllExeptNumbers, get2Decimals } from "../stringTreatments";

export const findNetBeforeTaxes = (text) => {
  return (
    text &&
    get2Decimals(
      removeAllExeptNumbers(
        text
          .split("netapayeravantimpotsurlerevenu")
          .filter((el) => Number(el.charAt(0)))[0]
      )
    )
  );
};
