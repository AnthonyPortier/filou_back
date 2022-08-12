// This Loads the configuration dynamically from to the current enviroment
// Defaults to _dev_ if the environment was set
import { env } from "custom-env";
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import { treatBadQuality } from "./opencv/treatBadQuality.js";
import { treatToGray } from "./opencv/treatToGray.js";
import { treatWithAdapdativeThreshold } from "./opencv/treatWithAdapdativeThreshold.js";
import { tesseractFunc } from "./tesseract/tesseractFunc.js";

import router from "./routes";
env(true);
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const secret_key = process.env.SECRET_KEY;

const upload = multer();
const app = express();
app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(helmet());

const port = process.env.PORT;
const identifiant = process.env.IDENTIFIANT;
const password = process.env.PASSWORD;
const db = process.env.DB_NAME;
mongoose.connect(
  `mongodb+srv://${identifiant}:${password}@filoubdd.5buih.mongodb.net/${db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("database is connected")
);

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      secret_key,
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

app.use("/api", router);

//////////////////////////////////////////////////////

app.post("/upload/passport", upload.single("file"), async (req, res, next) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
