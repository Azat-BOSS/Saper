import { emoji } from "./variables.js"

const timerMinutes = document.querySelector(".timer-minutes")
const timerSeconds = document.querySelector(".timer-seconds")
let seconds = 40
let minutes = 40
let timeMinut = 40 * 60

function generateNumTimer() {
  seconds = timeMinut%60
  minutes = timeMinut/60%60

  timerMinutes.innerHTML = `0:${Math.trunc(minutes)}`
  timerSeconds.innerHTML = `0:${Math.trunc(seconds)}`
  if(emoji.textContent !== "😵") {
    --timeMinut 
  }
}

export function generateTimer() {
  setInterval(() => generateNumTimer(), 1000)
}

