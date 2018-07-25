import { blur, greyscale, highlight, clamp} from '../../src/helpers/canvas-helpers';

describe('canvasHelpers', () => {
  const imgData = {
    data: [168, 130, 65, 255, 153, 115, 50, 255, 171, 133, 68, 255, 204, 166, 101, 255, 164, 126, 61, 255, 164, 126, 61, 255, 205, 168, 100, 255, 145, 108, 40, 255, 148, 111, 43, 255],
    height: 3,
    width: 3,
  };

  it('should blur image on canvas', () => {
    const expected = [167, 130, 67, 255, 165, 129, 66, 255, 165, 128, 65, 255, 164, 128, 65, 255, 164, 127, 65, 255, 163, 127, 65, 255, 163, 127, 65, 255, 162, 126, 65, 255, 162, 126, 65, 255];
    const output = blur(imgData, 3, 3).data;
    expect(output).toEqual(expected);
  });

  it('should greyscale image on canvas', () => {
    const expected = [135, 135, 135, 255, 133, 133, 133, 255, 133, 133, 133, 255, 132, 132, 132, 255, 132, 132, 132, 255, 131, 131, 131, 255, 131, 131, 131, 255, 131, 131, 131, 255, 131, 131, 131, 255];
    const output = greyscale(imgData).data;
    expect(output).toEqual(expected);
  });

  it('should highlight image on canvas', () => {
    const expected = [270, 270, 270, 255, 266, 266, 266, 255, 266, 266, 266, 255, 264, 264, 264, 255, 264, 264, 264, 255, 262, 262, 262, 255, 262, 262, 262, 255, 262, 262, 262, 255, 262, 262, 262, 255];
    const output = highlight(imgData).data;
    expect(output).toEqual(expected);
  });

  it('should work clamp like a charm', () => {
    const expected = 25;
    expect(clamp(42,1,25)).toEqual(expected);
  })

});
