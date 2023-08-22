export const resetGame = () => {
  const btn = document.querySelector('.reset-btn');
  btn.addEventListener('click', () => {
    location.reload();
  });
}