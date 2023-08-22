import { viewCarsPlaces, pageNum } from '../../view/view-garage/view-garage';
import { createCar } from '../api/api-methods';
import { changePaginationBtns } from './garage-pagination';

const addCar = (): void => {
  const createBtn = document.querySelector('.create-form__button');
  createBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName: HTMLInputElement = document.querySelector('.create-form__text') as HTMLInputElement;
    const inputColor: HTMLInputElement = document.querySelector('.create-form__color') as HTMLInputElement;

    const createColor: string = inputColor.value;
    const createName: string = inputName.value ? inputName.value : 'No name';

    createCar({ name: `${createName}`, color: `${createColor}` });
    viewCarsPlaces();
    inputName.value = '';
    const { number } = pageNum;
    changePaginationBtns(number);
  });
};
export default addCar;
