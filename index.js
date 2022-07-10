import { treatBadQuality } from "./opencv/treatBadQuality.js";
import { treatToGray } from "./opencv/treatToGray.js";
import { treatWithAdapdativeThreshold } from "./opencv/treatWithAdapdativeThreshold.js";
import { tesseractFunc } from "./tesseract/tesseractFunc.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import axios from "axios";
import e from "express";

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const upload = multer();
const app = express();
app.use(cors(corsOptions));
const port = 8080;

app.post("/upload/passeport", upload.single("file"), async (req, res, next) => {
  fs.writeFileSync(
    "./img/imageToTreat.png",
    req.file.buffer,
    "binary",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  // extract without openCV treatment
  const data = await tesseractFunc("noTreatement");

  // extract with openCV treatment for bad quality
  //treatBadQuality();
  //tesseractFunc("badquality");

  // extract with openCV treatement with gray transform
  //treatToGray()
  //tesseractFunc("gray");

  // extract with openCV treatement with adapdative Theshold
  //treatWithAdapdativeThreshold();
  //tesseractFunc("adaptativeThreshold");

  //GET NAME / FIRSTNAME / COUNTRY
  const filterInfo = data.filter((text) => text.includes("P<FRA"));
  const info = filterInfo.map((text) => {
    const name = text.match(/P<FRA(.*?)</i)[1];
    const firstName = text.match(/<<(.*?)</i)[1];
    return { name, firstName };
  });
  let uniq = {};
  const infoFiltered = info.filter((obj) => !uniq[obj] && (uniq[obj] = true));

  // a supprimer !!!!
  fs.writeFileSync(
    "./data.json",
    JSON.stringify({
      ...infoFiltered[0],
    })
  );
  res.send(infoFiltered[0]);
});

app.post("/upload/payslip", upload.single("file"), async (req, res, next) => {
  fs.writeFileSync(
    "./img/imageToTreat.png",
    req.file.buffer,
    "binary",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  // extract without openCV treatment
  const data = await tesseractFunc("noTreatement");

  // extract with openCV treatment for bad quality
  //treatBadQuality();
  //tesseractFunc("badquality");

  // extract with openCV treatement with gray transform
  //treatToGray()
  //tesseractFunc("gray");

  // extract with openCV treatement with adapdative Theshold
  //treatWithAdapdativeThreshold();
  //tesseractFunc("adaptativeThreshold");

  //GET SIRET / NAME ENTERPRISE / BRUT / NET
  const info = data.map((el) => {
    const textLowerCase = el
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace(/à/g, "a")
      .replace(/ô/g, "o")
      .replace(/,/g, ".");

    const textLowerCaseSplited = textLowerCase.split(" ");
    const textLowerCaseRemoveSpace = textLowerCase.replace(
      /[^a-zA-Z0-9.]/g,
      ""
    );
    const siret = textLowerCaseSplited.filter(
      (el) => el.length === 14 && Number(el)
    );

    const apeOrNaf = textLowerCase
      .split(/ape|naf/g)
      .filter((el) => Number(el.charAt(0)))[0];
    console.log(apeOrNaf, "apeOrNafapeOrNafapeOrNafapeOrNaf");
    const securiteSoc = textLowerCaseSplited.filter(
      (el) => el.length === 15 && Number(el)
    );

    const job = el
      .toLowerCase()
      .split("\n")
      .filter((el) => el.includes("emploi"))[0];

    const brut = textLowerCaseRemoveSpace
      .split("brut")
      .filter((el) => Number(el.charAt(0)))[0];

    const netBeforeTaxe = textLowerCaseRemoveSpace
      .split("netapayeravantimpotsurlerevenu")
      .filter((el) => Number(el.charAt(0)))[0];

    const net = textLowerCaseRemoveSpace
      .split("netapayer")
      .filter((el) => Number(el.charAt(0)))[0];

    if (siret && securiteSoc && job && brut && netBeforeTaxe && net) {
      return {
        siret,
        securiteSoc: securiteSoc[0],
        job: job.replace("emploi", ""),
        brut: brut && brut.replace(/(^\d+\.\d+)(.+$)/i, "$1"),
        net: net && net.replace(/(^\d+\.\d+)(.+$)/i, "$1"),
        netBeforeTaxe:
          netBeforeTaxe && netBeforeTaxe.replace(/(^\d+\.\d+)(.+$)/i, "$1"),
      };
    }
  });
  let uniq = {};
  const infoFiltered = info.filter((obj) => !uniq[obj] && (uniq[obj] = true));

  const dataGouv = await axios.get(
    `https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/${infoFiltered[0].siret}`
  );

  // a supprimer !!!!
  fs.writeFileSync(
    "./data.json",
    JSON.stringify({
      ...infoFiltered[0],
      ...dataGouv.data.etablissement,
    })
  );
  res.json({ ...infoFiltered[0], ...dataGouv.data.etablissement });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
