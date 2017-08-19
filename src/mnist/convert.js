const fs = require('fs');
const dataFileBuffer = fs.readFileSync('./train-images-idx3-ubyte');
const labelFileBuffer = fs.readFileSync('./train-labels-idx1-ubyte');
const pixelValues = [];

const convertOut = (out$) => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return array.map(n => n === out$ ? 1 : 0);
};

const limits = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
const limit = 100;

const convertIn = (in$) => in$ / 255;

for (let image = 0; image <= 59999; image++) {
  const pixels = [];

  for (let y = 0; y <= 27; y++) {
    for (let x = 0; x <= 27; x++) {
      pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 16]);
    }
  }

  const input$ = pixels;
  const output$ = (labelFileBuffer[image + 8]);
  const imageData = { input: input$.map(convertIn), output: convertOut(output$) };

  if (limits[output$] < limit) {
    pixelValues.push(imageData);
    limits[output$] += 1;
  }

}

console.log(JSON.stringify(pixelValues));