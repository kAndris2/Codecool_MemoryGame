const cards = document.querySelectorAll('.card');

let turned = false;
let noturn = false;

let firstChoice, secondChoice;
var allPoints = 0;

function turn(){
  if (noturn) return;
  if (this === firstChoice) return;

  this.classList.add('flip');

  if (!turned) {
    turned = true;
    firstChoice = this;
    return;
  }
   secondChoice = this;
   evaluateChoice();
}

function evaluateChoice(){
  let isMatch = firstChoice.dataset.id === secondChoice.dataset.id;
  if (isMatch) {
    allPoints += 1;
    document.getElementById("points").innerHTML = allPoints;
    if (allPoints === (cards.length / 2)) gameOver();
  }
  isMatch ? denyTurn() : turnBack();
}

function denyTurn(){
  firstChoice.removeEventListener('click', turn);
  secondChoice.removeEventListener('click', turn);

  resetBoard();
}

function turnBack(){
  noturn = true;

  setTimeout(() => {
    firstChoice.classList.remove('flip');
    secondChoice.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [turned, noturn] = [false, false];
  [firstChoice, secondChoice] = [null, null];
}

function gameOver(){
  document.getElementById("modal-on").click();
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', turn));
