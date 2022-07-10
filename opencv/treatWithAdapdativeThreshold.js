import cv from "opencv4nodejs";

export const treatWithAdapdativeThreshold = () => {
  const originalImage = cv.imread("./img/imageToTreat.png");
  const gray = originalImage.cvtColor(cv.COLOR_BGR2GRAY);

  const imgf = gray.adaptiveThreshold(
    255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    11,
    2
  );
  cv.imwrite("./img/readyToUse.png", imgf);
};
