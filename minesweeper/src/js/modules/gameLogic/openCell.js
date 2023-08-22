export const openCell = () => {
  const gameZone = document.querySelector('.game-zone');
  gameZone.addEventListener('click', (event) => {
    const cell = event.target;
    if (event.target.classList.contains('flag')) {
      return;
    }
    cell.classList.add('disable')
    if (cell.children.length !== 0) {
      const mine = cell.children[0];
      mine.classList.add('active');
    }
  });
}