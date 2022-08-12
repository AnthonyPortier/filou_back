
import axios from 'axios';
import { categories, coefficients, levels } from "../../constants/payslipInfos";
import { isDDMMYYYY } from "../isDate";
import { findBrut } from "../find_inside_text/findBrut";
import { findNetBeforeTaxes } from "../find_inside_text/findNetBeforeTaxes";

export const findInfosInsidePayslip = async (data)=>{
    const info = data.map((el) => {
    const textLowerCase = el
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace(/,/g, ".")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const textLowerCaseSplited = textLowerCase.split(" ");
    const textLowerCaseRemoveSpace = textLowerCase.replace(
      /[^a-zA-Z0-9.]/g,
      ""
    );

    const allDates = textLowerCaseSplited.filter((el) => isDDMMYYYY(el));
    const startDate = allDates[0];
    const endDate = allDates[1];

    const category = categories.find((t) => textLowerCase.includes(t));

    const coefficient = coefficients.find((t) =>
      textLowerCase.includes(` ${t} `)
    );

    const level = levels.find((t) => textLowerCase.includes(` ${t} `));

    const siret = textLowerCaseSplited.find(
      (el) => el.length === 14 && Number(el)
    );

    const securiteSoc = textLowerCaseSplited.filter(
      (el) => el.length === 15 && Number(el)
    );

    const job = el
      .toLowerCase()
      .split("\n")
      .filter((el) => el.includes("emploi"))[0];

    const brut = findBrut(textLowerCaseRemoveSpace);
    const netBeforeTaxes = findNetBeforeTaxes(textLowerCaseRemoveSpace);

    const net = textLowerCaseRemoveSpace
      .split("netapayer")
      .filter((el) => Number(el.charAt(0)))[0];

    const mandatorySentence = textLowerCase.includes("service-public.fr");

    return {
      startDate,
      endDate,
      category,
      coefficient,
      level,
      siret,
      securiteSoc: securiteSoc[0],
      job: job && job.replace("emploi", ""),
      brut: brut && brut,
      net: net && net.replace(/(^\d+\.\d+)(.+$)/i, "$1"),
      netBeforeTaxes: netBeforeTaxes && netBeforeTaxes,
      mandatorySentence,
    };
  });
  let uniq = {};
  const infosFiltered = info.filter((obj) => !uniq[obj] && (uniq[obj] = true));
  const dataGouv = await axios.get(
    `https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${infosFiltered[0].siret}`
  );

  return { ...infosFiltered[0], company: dataGouv.data.etablissement }
}