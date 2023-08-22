import { pageNum, quantityCarOnPage, viewCarsPlaces } from '../../view/view-garage/view-garage';
import { getAllCars } from '../api/api-methods';

export const changePaginationBtns = async (pageNumber: number): Promise<void> => {
  const prevBtn: HTMLButtonElement = document.querySelector('.prev-garage-btn') as HTMLButtonElement;
  const nextBtn: HTMLButtonElement = document.querySelector('.next-garage-btn') as HTMLButtonElement;
  if (pageNumber === 1) {
    prevBtn.classList.add('disable');
    prevBtn.disabled = true;
  }
  if (pageNumber > 1) {
    prevBtn.classList.remove('disable');
    prevBtn.disabled = false;
  }

  const carsQuantity: number = (await getAllCars({
    page: pageNum.number,
    limit: quantityCarOnPage,
  })).quantityCars;
  const maxPages = Math.ceil(carsQuantity / quantityCarOnPage);

  if (carsQuantity > quantityCarOnPage) {
    nextBtn.classList.remove('disable');
    nextBtn.disabled = false;
  }

  if (carsQuantity < quantityCarOnPage) {
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

const paginationHandler = (): void => {
  changePaginationBtns(pageNum.number);
  const prevBtn: HTMLButtonElement = document.querySelector('.prev-garage-btn') as HTMLButtonElement;
  const nextBtn: HTMLButtonElement = document.querySelector('.next-garage-btn') as HTMLButtonElement;
  const pageNumElem: HTMLHeadingElement = document.querySelector('.garage-page__num') as HTMLHeadingElement;
  const cars: HTMLDivElement = document.querySelector('.cars') as HTMLDivElement;

  nextBtn.addEventListener('click', () => {
    pageNum.number += 1;
    changePaginationBtns(pageNum.number);
    pageNumElem.innerHTML = `Page #${pageNum.number}`;
    cars.innerHTML = '';
    viewCarsPlaces();
  });

  prevBtn.addEventListener('click', () => {
    pageNum.number -= 1;
    changePaginationBtns(pageNum.number);
    pageNumElem.innerHTML = `Page #${pageNum.number}`;
    cars.innerHTML = '';
    viewCarsPlaces();
  });
};
export default paginationHandler;
