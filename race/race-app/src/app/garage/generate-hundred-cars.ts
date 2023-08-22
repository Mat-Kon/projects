import { viewCarsPlaces, pageNum } from '../../view/view-garage/view-garage';
import { createHundredCars } from '../api/api-methods';
import { activeElement, disableElement } from '../helpers';
import { changePaginationBtns } from './garage-pagination';

const addHundredCars = (): void => {
  const generateCars = document.querySelector('.generate-cars-button') as HTMLButtonElement;
  generateCars?.addEventListener('click', () => {
    disableElement(generateCars);
    const { number } = pageNum;
    createHundredCars();
    viewCarsPlaces();
    changePaginationBtns(number);
    setTimeout(() => activeElement(generateCars), 1000);
  });
};
export default addHundredCars;
