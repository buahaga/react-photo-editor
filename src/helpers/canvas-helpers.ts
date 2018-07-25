export function blur(imgData: ImageData, radius: number) {
  const pixels = imgData.data;
  const blurRadius = radius;
  let multiWidth, pixelsAround, sumOpacity, sumRed, sumGreen, sumBlue, count;
  for (let blur = 0; blur < blurRadius; blur++) {
    for (let i = 0, n = pixels.length; i < n; i += 4) {
      sumOpacity = sumRed = sumGreen = sumBlue = count = 0;
      multiWidth = imgData.width * 4;
      pixelsAround = [i - multiWidth - 4, i - multiWidth, i - multiWidth + 4, i - 4, i + 4, i + multiWidth - 4, i + multiWidth, i + multiWidth + 4];
      for (let i = 0; i < pixelsAround.length; i++) {
        if (pixelsAround[i] >= 0 && pixelsAround[i] <= pixels.length - 3) {
          sumOpacity += pixels[pixelsAround[i]];
          sumRed += pixels[pixelsAround[i] + 1];
          sumGreen += pixels[pixelsAround[i] + 2];
          sumBlue += pixels[pixelsAround[i] + 3];
          count += 1;
        }
      }
      pixels[i] = Math.ceil((sumOpacity / count) * 0.99);
      pixels[i + 1] = Math.ceil((sumRed / count) * 0.99);
      pixels[i + 2] = Math.ceil((sumGreen / count) * 0.99);
      pixels[i + 3] = Math.ceil((sumBlue / count));
    }
  }
  return imgData;
}

export function greyscale(imgData: ImageData) {
  const pixels = imgData.data;
  for (let i = 0, n = pixels.length; i < n; i += 4) {
    const grayscale = Math.ceil(pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11);
    pixels[i] = grayscale;
    pixels[i + 1] = grayscale;
    pixels[i + 2] = grayscale;
  }
  return imgData;
}

export function highlight(imgData: ImageData) {
  const pixels = imgData.data;
  for (let i = 0, n = pixels.length; i < n; i += 4) {
    pixels[i] = Math.ceil(pixels[i] * 2);
    pixels[i + 1] = Math.ceil(pixels[i + 1] * 2);
    pixels[i + 2] = Math.ceil(pixels[i + 2] * 2);
  }
  return imgData;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}
