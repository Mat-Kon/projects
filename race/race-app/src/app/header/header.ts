const changePage = (): void => {
  const btnContainer: HTMLElement | null = document.querySelector('.btn-container');
  const garagePage = document.querySelector('.garage-page');
  const winnerPage = document.querySelector('.winners-page');

  btnContainer?.addEventListener('click', (event) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;

    if (button.classList.contains('garage-btn')) {
      garagePage?.classList.remove('hidden');
      winnerPage?.classList.add('hidden');
    }
    if (button.classList.contains('winner-btn')) {
      winnerPage?.classList.remove('hidden');
      garagePage?.classList.add('hidden');
    }
  });
};
export default changePage;
