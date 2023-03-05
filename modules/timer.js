import { emoji } from "../utils/variables.js"

const timerSeconds = document.querySelector(".timer-seconds")
let seconds = 0

function generateNumTimer() {
  timerSeconds.innerHTML = `${Math.trunc(seconds)}`
  if(emoji.textContent !== "😵") {
    seconds++
  }
}

export function generateTimer() {
  setInterval(() => generateNumTimer(), 1000)
}

