import { flagCount, bombCount } from "../utils/variables.js"

let count = bombCount
flagCount.textContent = count

export function decrementCntFlags() {
  flagCount.textContent = count - 1
  count--
}

export function incrementCntFlags() {
  flagCount.textContent = count + 1
  count++
}