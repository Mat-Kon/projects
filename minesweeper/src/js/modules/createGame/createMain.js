import { timer } from "./createTimer.js";

let quantityCell = 100;
let quantityMine = 10;
export let clickCounter = 0;

const createGameZone = () => {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  const gameZone = document.createElement('div');
  main.classList.add('main');
  gameZone.classList.add('game-zone');
  body.append(main);
  main.append(gameZone);
};
createGameZone();

const createCell = () => {
  const cell = document.createElement('div');
  const main = document.querySelector('.game-zone');
  cell.classList.add('cell');
  main.append(cell);
};

for (let i = 0; i < quantityCell; i++) {
  createCell();
};

const createMine = (num) => {
  const cell = document.querySelectorAll('.cell');
  const mine = document.createElement('span');
  mine.classList.add('mines');
  if (cell[num].classList.contains('disable')) {
    cell[num + 2].append(mine);

  } else {
    cell[num].append(mine);
  }
}

const getRandomArray = () => {
  const randomNum = [];
  while (randomNum.length < 10) {
    const ranNum = Math.floor(Math.random() * 100);
    if (!randomNum.includes(ranNum)) {
      randomNum.push(ranNum);
    };
  };
  return randomNum;
}

const appendMine = () => {
  document.querySelector('.game-zone').addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
      if (clickCounter === 0) {
        timer(10);
      }
      clickCounter++

      if (clickCounter === 2) {
        const randomNumbers = getRandomArray();
        for (let i = 0; i < quantityMine; i++) {
          createMine(randomNumbers[i]);
        };
      }
    }
  });
}
appendMine();

const createResetBtn = () => {
  const main = document.querySelector('.main');
  const resetBtn = document.createElement('span');
  resetBtn.classList.add('reset-btn');
  resetBtn.textContent = 'Reset';
  main.before(resetBtn);
}
createResetBtn();