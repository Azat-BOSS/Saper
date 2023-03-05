import { createMatrix } from "./modules/matrix.js";
import { generateTimer } from "./modules/timer.js";
import { emoji, width, height, bombCount } from "./utils/variables.js";
import { reloadGame } from "./modules/stopGame.js";

function main() {
  createMatrix(width, height, bombCount)
  generateTimer()
  emoji.addEventListener("click", reloadGame)
}
main()

