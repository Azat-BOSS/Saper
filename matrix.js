import { generateRandom } from "./random.js";
import { createBox } from "./box.js";

export let matrix = [];

function createBomb(bombCount) {
  let currentBombCount = bombCount
  
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;
  while(currentBombCount) {
    const x = generateRandom(0, matrixWidth - 1);
    const y = generateRandom(0, matrixHeight - 1);

    const matrixElem = matrix[y][x]
    if (!matrixElem) {
      matrix[y][x] = 1;
      currentBombCount--;
    }
  }
}

export function getAllNeighbors(coordinates) {
  const {x, y} = coordinates

  const n1 = matrix[y - 1]?.[x];
  const n2 = matrix[y - 1]?.[x + 1];
  const n3 = matrix[y]?.[x + 1];
  const n4 = matrix[y + 1]?.[x + 1];
  const n5 = matrix[y + 1]?.[x];
  const n6 = matrix[y + 1]?.[x - 1];
  const n7 = matrix[y]?.[x - 1];
  const n8 = matrix[y - 1]?.[x - 1];

  const n9 = matrix[x]?.[y + 1];
  const n10 = matrix[x + y]?.[y - x];
  const n11 = matrix[x + x]?.[y];
  const n12 = matrix[x + x]?.[y + x];
  const n13 = matrix[x ]?.[y + x];
  const n14 = matrix[x - x]?.[y + x];
  const n15 = matrix[x - x]?.[y];
  const n16 = matrix[x - x]?.[y - x];

  return [
    n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16].filter(item => {
      return typeof(item) !== "undefined"
    })
}

export function openAllBoxes() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      }
    });
  });
}

export function createMatrix(width = 16, height = 16, bombCount = 20) {
  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  createBomb(bombCount);

  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newBox = createBox(Boolean(matrixElem), {x, y})
      matrix[y][x] = newBox
    })
  })
}
