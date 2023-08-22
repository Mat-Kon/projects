export const gameWin = () => {
  const cells = document.querySelectorAll('.cell');
  const mines = document.querySelectorAll('.mines');
  const gameZone = document.querySelector('.game-zone');
  const timerContain = document.querySelector('.timer-contain');
  const timer = document.querySelector('.timer');
  const clickCounter = document.createElement('p');
  clickCounter.classList.add('click-counter');
  timerContain.append(clickCounter);
  clickCounter.textContent = `move: 0`;
  let counter = 0;
  let openCell = 0;
  let activeMine = 0;

  gameZone.addEventListener('click', (event) => {
    let  time = timer.innerHTML.split(':');
    time = (+time[0] * 60) + +time[1];
    if (event.target.classList.contains('cell')) {
      counter++;
      clickCounter.textContent = `move: ${counter}`;
    }
    cells.forEach((elem) => {
      if (elem.classList.contains('disable')) {
        openCell++
      }
    });
    if (openCell === 90 && activeMine === 0) {
      timerContain.textContent = `Hooray! You found all mines in ${time} seconds and ${counter} moves!`
    }
  });

  gameZone.addEventListener('contextmenu', (event) => {
    if (event.target.classList.contains('cell')) {
      counter++;
      clickCounter.textContent = `move: ${counter}`;
    }
  });
}