const cards = document.querySelectorAll('.card');

let turned = false;
let noturn = false;

let firstChoice, secondChoice;

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
  let isMatch = firstChoice.dataset.framework === secondChoice.dataset.framework;

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
  }, 1500);
}


function resetBoard() {
  [turned, noturn] = [false, false];
  [firstChoice, secondChoice] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', turn));
