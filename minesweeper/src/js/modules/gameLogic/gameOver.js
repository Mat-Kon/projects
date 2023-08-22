const gameOverToFindMine = () => {
  const gameZone = document.querySelector('.game-zone');
  const timerContain = document.querySelector('.timer-contain');
  const cells = gameZone.children;
  gameZone.addEventListener('click', (event) => {
    const cell = event.target;
    if (event.target.classList.contains('flag') && cell.children.length !== 0) {
      return;
    }
    if (cell.children.length !== 0) {
      const mine = cell.children[0];
      if (mine.classList.contains('mines')) {
        timerContain.textContent = 'Game over.\n Try again';
        for (let cell of cells) {
          cell.classList.add('disable')
          if (cell.children.length !== 0) {
            cell.children[0].classList.add('active')
          }
        }
      }
    }
  });
};
gameOverToFindMine();