import cv from "opencv4nodejs";

export const treatBadQuality = () => {
  const originalImage = cv.imread("./img/imageToTreat.png");

  const grayImage = originalImage.bgrToGray();
  const thresh = grayImage.threshold(
    0,
    255,
    cv.THRESH_BINARY_INV | cv.THRESH_OTSU
  );
  const dist = thresh
    .distanceTransform(cv.DIST_L2, 5)
    .normalize(0, 1.0, cv.NORM_MINMAX);
  const test = dist.convertTo(8, 255, 0);

  const dist2 = test.threshold(15, 255, 0, cv.THRESH_OTSU);
  const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(7, 7));
  const opening = dist2.morphologyEx(kernel, cv.MORPH_OPEN);

  const getHandContour = (handMask) => {
    const mode = cv.RETR_EXTERNAL;
    const method = cv.CHAIN_APPROX_SIMPLE;
    const contours = handMask.findContours(mode, method);
    // largest contour
    return contours.sort((c0, c1) => c1.area - c0.area)[0];
  };

  let edgeContour = getHandContour(opening);
  let edgePoints = edgeContour.getPoints();
  const color = new cv.Vec3(0, 255, 0);
  let x = opening.drawContours([edgePoints], -1, color, -1);

  const mask = opening.dilate(new cv.Mat(x), new cv.Point2(0, 0), 2);
  const final = mask.bitwiseAnd(opening);

  cv.imwrite("./img/readyToUse.png", final);
};
