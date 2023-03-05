import { getAllNeighbors, openAllBoxes } from "./matrix.js"
import { app, emoji, bombCount, flagCount } from "../utils/variables.js"
import { decrementCntFlags, incrementCntFlags } from "./flags.js"
import { disabledAllButtons } from "./stopGame.js"
class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb
    this.coordinates = coordinates
  }

  setBoxValue(value) {
    this.value = value
  }

  setBoxType() {
    if(this.isBomb) {
      this.setBoxValue("💣")
      return
    }
    const allNeighbors = getAllNeighbors(this.coordinates)
    let bombCount = 0

    allNeighbors.forEach(neighbor => {
      if(neighbor === 1 || neighbor.isBomb) {
        bombCount++
      }
    })

    if(bombCount) {
      this.setBoxValue(bombCount)
    }
  }

  showBoxValue() {
    this.boxElem.innerHTML = this.value || "";
  }

  open() {
    this.isOpenned = true;
    this.boxElem.classList.remove("app__box_disabled");
    this.boxElem.setAttribute("disabled", true)
    this.showBoxValue();
  }

  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
    this.boxElem.innerHTML = isFlagged ? "🚩" : "";
  }

  setQuestion(isQuestion) {
    this.isQuestion = isQuestion
    this.boxElem.innerHTML = this.isQuestion ? "❓": ""
  }

  gameOver(isOver) {
    this.isOver = isOver
    this.isOver ? emoji.textContent = "😵" : null
  }

  onBoxClick(allowOpenNumber = false) {
      if(this.isFlagged) {
        this.setFlag(false);
        return;
      }
      if(this.isQuestion) {
        this.setQuestion(false);
        return;
      }
      if(!this.value && !this.isOpenned) {
        const allNeighbors = getAllNeighbors(this.coordinates)
        this.open()
  
        allNeighbors.forEach(neighbor => {
          if(!neighbor.isOpenned) {
            neighbor.onBoxClick(true)
          }
        })
      } else if(this.value && allowOpenNumber || typeof this.value === "number"){ 
        this.open()
      } else if(this.isBomb){
        openAllBoxes()
        this.gameOver(true)
        disabledAllButtons()
        flagCount.textContent = bombCount
      }
    this.showBoxValue()
  }

  createBoxOnArea() {
    const boxElem = document.createElement("button")
    
    this.boxElem = boxElem
    boxElem.classList.add("app__box_disabled", "app__box")

    if(this.value) {
      boxElem.classList.add(`app__box__${this.value}`)
    }
    this.boxElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.setFlag(true)
      decrementCntFlags()
      if(e.shiftKey) {
        this.setQuestion(true)
      }
    });
    this.boxElem.addEventListener("click", (e) => {
      if(this.boxElem.textContent ===  "🚩") {
        incrementCntFlags()
      }
    });

    this.boxElem.addEventListener("mousedown", () => {emoji.textContent = "😮"})
    this.boxElem.addEventListener("click", () => {
      emoji.textContent = "🙂"
      this.onBoxClick()
    })
    app.appendChild(boxElem)
  }
}

export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates)

  newBox.setBoxType()
  newBox.createBoxOnArea()
  return newBox
}