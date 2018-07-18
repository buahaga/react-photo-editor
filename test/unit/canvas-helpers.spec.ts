import { blur, greyscale, highlight} from '../../src/helpers/canvas-helpers';

describe('canvasHelpers', () => {
  const imgData = {
    data: [168, 130, 65, 255, 153, 115, 50, 255, 171, 133, 68, 255, 204, 166, 101, 255, 164, 126, 61, 255, 164, 126, 61, 255, 205, 168, 100, 255, 145, 108, 40, 255, 148, 111, 43, 255],
    height: 3,
    width: 3,
  };

  it('should blur image on canvas', () => {
    const expected = [171, 134, 67, 255, 171, 134, 67, 255, 171, 133, 67, 255, 172, 134, 68, 255, 171, 134, 67, 255, 171, 133, 67, 255, 172, 134, 68, 255, 171, 134, 67, 255, 171, 134, 67, 255];
    const output = blur(imgData, 3, 3).data;
    expect(output).toEqual(expected);
  });

  it('should greyscale image on canvas', () => {
    const expected = [138, 138, 138, 255, 138, 138, 138, 255, 138, 138, 138, 255, 139, 139, 139, 255, 138, 138, 138, 255, 138, 138, 138, 255, 139, 139, 139, 255, 138, 138, 138, 255, 138, 138, 138, 255];
    const output = greyscale(imgData).data;
    expect(output).toEqual(expected);
  });

  it('should highlight image on canvas', () => {
    const expected = [276, 276, 276, 255, 276, 276, 276, 255, 276, 276, 276, 255, 278, 278, 278, 255, 276, 276, 276, 255, 276, 276, 276, 255, 278, 278, 278, 255, 276, 276, 276, 255, 276, 276, 276, 255];
    const output = highlight(imgData).data;
    expect(output).toEqual(expected);
  });

});
