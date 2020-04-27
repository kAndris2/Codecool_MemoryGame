const cards = document.querySelectorAll('.card');

let turned = false;
let noturn = false;

let firstChoice, secondChoice;
var allPoints = 0;

window.onload = function () {
    display = document.querySelector('#time');
    startTimer(60, display);
};


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

function resetAll(){
  location.reload();
  //resetBoard();
  //shuffle();
}

function gameOver(){
  document.getElementById("modal-on").click();
}

(function shuffleStart() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
})();

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
}

cards.forEach(card => card.addEventListener('click', turn));

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        else if(timer === 0){
          resetAll();
        }
    }, 1000);
}
