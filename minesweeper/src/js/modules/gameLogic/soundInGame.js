const player = () => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      playSound(event)
    });
  });
}
player();

const playSound = (event) => {
  const audio = new Audio();
  if (event.target.classList.contains('cell')) {
    audio.src = './assets/sounds/click.mp3';
    audio.play();
  }
}