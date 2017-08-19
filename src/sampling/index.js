import bicubicSample from 'bicubic-sample';

const getSample = (input, side) => bicubicSample((x, y) => input[x * side + y]);

export const scale = (input, side, scaleFactor = 10) => {
  const sample = getSample(input, side);
  const result = [];
  for (let x = 0; x < (side * scaleFactor); x++) {
    for (let y = 0; y < (side * scaleFactor); y++) {
      result.push(sample((x / scaleFactor), (y / scaleFactor)));
    }
  }
  return result;
};