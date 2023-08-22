const resetGame = () => {
  const btn = document.querySelector('.reset-btn');
  btn.addEventListener('click', () => {
    location.reload();
  });
}
resetGame();

// const setLocalStorage = () => {
//   const timer = document.querySelector('.timer')
//   const clickCounter = document.querySelector('.click-counter');
//   const flagsCounter = document.querySelector('.flags__content');
//   const cells = document.querySelectorAll('.cell');

//   window.addEventListener('click', () => {
//   });
// }
// setLocalStorage()