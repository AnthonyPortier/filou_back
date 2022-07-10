import tesseract from "node-tesseract-ocr";

export const tesseractFunc = async (evol = "") => {
  const psm = [4, 6, 8, 10, 11];

  const results = await Promise.all(
    psm.map(async (p) => {
      const config = {
        lang: "fra",
        oem: 3,
        psm: p,
      };
      const data = await tesseract
        .recognize(
          [
            evol === "noTreatement"
              ? "./img/imageToTreat.png"
              : "./img/readyToUse.png",
          ],
          config
        )
        .then((text) => {
       
          return text;
        })
        .catch((error) => {
          console.log(error.message);
        });
      return data;
    })
  );
  return results;
};
