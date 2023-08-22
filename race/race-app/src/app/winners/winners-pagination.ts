import { limitWinners, viewWinners, winnerPage } from '../../view/view-winner/view-winners';
import { getAllWinners } from '../api/api-methods';

export const changePaginationBtns = async (pageNumber: number): Promise<void> => {
  const prevBtn: HTMLButtonElement = document.querySelector('.prev-winner-btn') as HTMLButtonElement;
  const nextBtn: HTMLButtonElement = document.querySelector('.next-winner-btn') as HTMLButtonElement;
  if (pageNumber === 1) {
    prevBtn.classList.add('disable');
    prevBtn.disabled = true;
  }
  if (pageNumber > 1) {
    prevBtn.classList.remove('disable');
    prevBtn.disabled = false;
  }

  const carsQuantity: number = (await getAllWinners({
    page: winnerPage.number,
    limit: limitWinners,
    sort: 'time',
    order: 'ASC',
  })).quantityCars;
  const maxPages = Math.ceil(carsQuantity / limitWinners);

  if (carsQuantity > limitWinners) {
    nextBtn.classList.remove('disable');
    nextBtn.disabled = false;
  }

  if (carsQuantity < limitWinners) {
    nextBtn.classList.add('disable');
    nextBtn.disabled = true;
  }

  if (pageNumber > 1 && pageNumber < maxPages) {
    nextBtn.classList.remove('disable');
    nextBtn.disabled = false;
    prevBtn.classList.remove('disable');
    prevBtn.disabled = false;
  }

  if (pageNumber === maxPages) {
    nextBtn.classList.add('disable');
    nextBtn.disabled = true;
  }
};

const paginationWinners = (): void => {
  changePaginationBtns(winnerPage.number);
  const prevBtn: HTMLButtonElement = document.querySelector('.prev-winner-btn') as HTMLButtonElement;
  const nextBtn: HTMLButtonElement = document.querySelector('.next-winner-btn') as HTMLButtonElement;
  const pageNumElem: HTMLHeadingElement = document.querySelector('.winner-page__num') as HTMLHeadingElement;

  nextBtn.addEventListener('click', () => {
    winnerPage.number += 1;
    changePaginationBtns(winnerPage.number);
    pageNumElem.innerHTML = `Page #${winnerPage.number}`;
    viewWinners();
  });

  prevBtn.addEventListener('click', () => {
    winnerPage.number -= 1;
    changePaginationBtns(winnerPage.number);
    pageNumElem.innerHTML = `Page #${winnerPage.number}`;
    viewWinners();
  });
};
export default paginationWinners;
