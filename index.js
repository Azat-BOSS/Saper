import { createMatrix } from "./matrix.js";
import { generateTimer } from "./timer.js";
import { emoji } from "./variables.js";
import { reloadGame } from "./stopGame.js";

function main() {
  createMatrix()
  generateTimer()
  emoji.addEventListener("click", reloadGame)
}
main()

