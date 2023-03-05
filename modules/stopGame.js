import { emoji } from "../utils/variables.js"

export function disabledAllButtons() {
  const buttons = document.querySelectorAll(".app__box")
  if(emoji.textContent === "😵") {
    buttons.forEach(el => {
      el.setAttribute("disabled", true)
    })
  }
}

export function reloadGame() {
  location.reload()
}