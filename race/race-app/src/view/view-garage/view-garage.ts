import logoRss from '../../img/logo.png';
import {
  getAllCars,
  isDrive,
  removeCar,
  removeWinner,
  startStopEngine,
  updateCarOnServer,
} from '../../app/api/api-methods';
import { ICar, Status, TParamCarSpeed } from '../../types/types';
import creatorElement, { activeElement, disableElement } from '../../app/helpers';
import getCarSVG from './get-car';
import { viewWinners } from '../view-winner/view-winners';
import { winnerCar } from '../../app/garage/determining-winner';

export const pageNum: Record<string, number> = {
  number: 1,
};
export const quantityCarOnPage = 7;

const createGarage = (): void => {
  const body = document.querySelector('body');
  const garagePage: HTMLDivElement = creatorElement({ tag: 'div', className: ['garage-page'] }) as HTMLDivElement;
  const pageName = creatorElement({ tag: 'h1', className: ['garage-page__name', 'page-name'], innerHTML: 'Garage' }) as HTMLHeadingElement;
  const viewPageNumber: HTMLHeadingElement = creatorElement({
    tag: 'h3',
    className: ['garage-page__num', 'page-num'],
    innerHTML: 'Page #1',
  }) as HTMLHeadingElement;

  const garageContainer: HTMLDivElement = creatorElement({ tag: 'div', className: ['cars-container'] }) as HTMLDivElement;
  const carsContainer: HTMLDivElement = creatorElement({ tag: 'div', className: ['cars'] }) as HTMLDivElement;
  const footer: HTMLElement = creatorElement({ tag: 'footer', className: ['footer'] });
  const logo = creatorElement({ tag: 'img', className: ['logo-rss'] }) as HTMLImageElement;
  logo.src = logoRss;
  logo.alt = 'Logo Rss';
  const rssLink = creatorElement({ tag: 'a', className: ['rss-link'] }) as HTMLLinkElement;
  rssLink.href = 'https://rs.school/';
  rssLink.setAttribute('target', '_blank');
  const gitLink = creatorElement({ tag: 'a', className: ['github-link'], innerHTML: 'GitHub' }) as HTMLLinkElement;
  gitLink.href = 'https://github.com/Mat-Kon';
  gitLink.setAttribute('target', '_blank');

  garageContainer.append(carsContainer);
  garagePage.append(
    pageName,
    viewPageNumber,
    garageContainer,
  );
  rssLink.append(logo);
  footer.append(rssLink, gitLink);
  garagePage.append(footer);
  body?.append(garagePage);
};

const raceHandler = (event: MouseEvent, startStatus: Status): void => {
  const raceBtn = event.target as HTMLButtonElement;
  disableElement(raceBtn);
  const resetBtn = document.querySelector('.reset-button') as HTMLButtonElement;
  disableElement(resetBtn);
  setTimeout(() => activeElement(resetBtn), 5000);
  const carsPlaces = document.querySelector('.cars')?.childNodes;
  carsPlaces?.forEach((car) => {
    const carPlace = car as HTMLElement;
    const carId = Number(carPlace.id);
    const goBtn = carPlace?.querySelector('.car__start') as HTMLButtonElement;
    disableElement(goBtn);
    const SVG = carPlace?.querySelector('.car-svg') as HTMLElement;
    const width = carPlace?.clientWidth;
    startStopEngine({ id: carId, status: startStatus })
      .then((data) => {
        const raceData = data as TParamCarSpeed;
        const timeRace = (raceData.distance / 1000) / raceData.velocity;
        if (SVG && timeRace) {
          SVG.style.transition = `transform linear ${timeRace}s`;
          SVG.style.transform = `translateX(calc(${width?.toString()}px - 100px))`;
        }
      });
    isDrive({ id: carId, status: 'drive' }).then((data) => {
      const driveData = data.success;
      if (driveData === false) {
        const rect = SVG.getBoundingClientRect();
        SVG.style.transform = `translateX(${rect.left}px)`;
        SVG.style.transition = 'none';
      }
    }).catch((err) => {
      let error = err;
      error = 'Сервер не успевает обрабатывать запросы';
      console.error(error);
    });
  });
};

const resetRaceHandler = (startStatus: Status): void => {
  const raceBtn = document.querySelector('.race-button') as HTMLButtonElement;
  const startPosition = 0;
  activeElement(raceBtn);
  const carsPlaces = document.querySelector('.cars')?.childNodes;
  carsPlaces?.forEach((car) => {
    const carPlace = car as HTMLElement;
    const carId = Number(carPlace.id);
    startStopEngine({ id: carId, status: startStatus });
    const goBtn = carPlace?.querySelector('.car__start') as HTMLButtonElement;
    activeElement(goBtn);
    const SVG = carPlace?.querySelector('.car-svg') as HTMLElement;
    SVG.style.transition = 'none';
    SVG.style.transform = `translateX(${startPosition}px)`;
  });
};

const viewBlockForms = (): void => {
  const garagePage: HTMLElement | null = document.querySelector('.garage-page');
  const formsContainer: HTMLDivElement = creatorElement({ tag: 'div', className: ['forms-container'] }) as HTMLDivElement;
  const managerContainer: HTMLDivElement = creatorElement({ tag: 'div', className: ['manager-buttons'] }) as HTMLDivElement;
  const raceBtn = creatorElement({ tag: 'button', className: ['race-button buttons'], innerHTML: 'RACE' }) as HTMLButtonElement;
  raceBtn.addEventListener('click', (event) => {
    raceHandler(event, 'started');
    winnerCar();
  });
  const resetBtn = creatorElement({ tag: 'button', className: ['reset-button buttons'], innerHTML: 'RESET' }) as HTMLButtonElement;
  resetBtn.addEventListener('click', () => resetRaceHandler('stopped'));
  const generateBtn = creatorElement({ tag: 'button', className: ['generate-cars-button buttons'], innerHTML: 'GENERATE CARS' }) as HTMLButtonElement;
  managerContainer.append(raceBtn, resetBtn, generateBtn);

  const createForm = creatorElement({ tag: 'form', className: ['create-form', 'form'] }) as HTMLFormElement;
  const datalist = `
  <option value="Mersedes AMG">
  <option value="Lada Vesta">
  <option value="Mini Couper">
  <option value="ZAZ Coupe">
  <option value="UAZ 4X4">
  `;
  const createList = creatorElement({ tag: 'datalist', className: ['datalist'], innerHTML: datalist });
  createList.id = 'create-list';
  const createTextInput = creatorElement({ tag: 'input', className: ['create-form__text'] }) as HTMLInputElement;
  createTextInput.type = 'text';
  createTextInput.setAttribute('list', 'create-list');
  const createColorInput = creatorElement({ tag: 'input', className: ['create-form__color'] }) as HTMLInputElement;
  createColorInput.type = 'color';
  const createBtn = creatorElement({ tag: 'button', className: ['create-form__button buttons'], innerHTML: 'CREATE' }) as HTMLButtonElement;
  createForm.append(createTextInput, createList, createColorInput, createBtn);

  const updateForm = creatorElement({ tag: 'form', className: ['update-form', 'form'] }) as HTMLFormElement;
  const updateTextInput = creatorElement({ tag: 'input', className: ['update-form__text'] }) as HTMLInputElement;
  updateTextInput.type = 'text';
  updateTextInput.disabled = true;
  const updateColorInput = creatorElement({ tag: 'input', className: ['update-form__color'] }) as HTMLInputElement;
  updateColorInput.type = 'color';
  const updateBtn = creatorElement({ tag: 'button', className: ['update-form__button buttons', 'disable'], innerHTML: 'UPDATE' }) as HTMLButtonElement;
  updateBtn.disabled = true;
  updateForm.append(updateTextInput, updateColorInput, updateBtn);

  formsContainer.append(createForm, updateForm, managerContainer);
  garagePage?.prepend(formsContainer);
};

const selectCarHandler = (event: MouseEvent, car: ICar): void => {
  const allSelectBtns = document.querySelectorAll('.car__select');
  const textForm = document.querySelector('.update-form__text') as HTMLInputElement;
  const colorForm = document.querySelector('.update-form__color') as HTMLInputElement;
  const updateBtn = document.querySelector('.update-form__button') as HTMLInputElement;
  allSelectBtns.forEach((btn) => {
    activeElement(btn as HTMLButtonElement);
  });
  const selectBtn = event.target as HTMLButtonElement;
  disableElement(selectBtn);
  activeElement(textForm);
  activeElement(updateBtn);
  const carPlace = document.getElementById(`${car.id}`);
  const nameCar = carPlace?.querySelector('p') as HTMLParagraphElement;
  const SVG = carPlace?.querySelector('svg g');
  const color = SVG?.getAttribute('fill');
  textForm.value = nameCar.textContent as string;
  colorForm.value = color as string;
};

const removeCarHandler = (carId: number): void => {
  const carsContainer = document.querySelector('.cars') as HTMLDivElement;
  const carPlace = document.getElementById(`${carId}`);
  removeWinner(carId);
  removeCar(carId);
  if (carPlace) {
    carsContainer.removeChild(carPlace);
  }
  viewWinners();
};

const startCarHandler = async (
  event: MouseEvent,
  carId: number,
  startStatus: Status,
): Promise<void> => {
  const carPlace = document.getElementById(`${carId}`);
  const goBtn = event.target as HTMLButtonElement;
  disableElement(goBtn);
  const stopBtn = carPlace?.querySelector('.car__stop') as HTMLButtonElement;
  activeElement(stopBtn);

  const SVG = carPlace?.querySelector('.car-svg') as HTMLElement;
  const width = carPlace?.clientWidth;
  const dataCarRace = await startStopEngine({ id: carId, status: startStatus }) as TParamCarSpeed;
  const timeRace = (dataCarRace.distance / 1000) / dataCarRace.velocity;
  if (SVG && timeRace) {
    SVG.style.transition = `transform linear ${timeRace}s`;
    SVG.style.transform = `translateX(calc(${width?.toString()}px - 100px))`;
  }
  const drive = await isDrive({ id: carId, status: 'drive' });
  if (drive.success === false) {
    const rect = SVG.getBoundingClientRect();
    SVG.style.transform = `translateX(${rect.left}px)`;
    SVG.style.transition = 'none';
  }
};

const stopCarHandler = (event: MouseEvent, carId: number, startStatus: Status): void => {
  const startPosition = 0;
  const carPlace = document.getElementById(`${carId}`);
  const stopBtn = event.target as HTMLButtonElement;
  disableElement(stopBtn);
  const goBtn = carPlace?.querySelector('.car__start') as HTMLButtonElement;
  activeElement(goBtn);
  const SVG = carPlace?.querySelector('.car-svg') as HTMLElement;
  startStopEngine({ id: carId, status: startStatus });
  SVG.style.transform = `translateX(${startPosition}px)`;
  SVG.style.transition = 'none';
};

const createCarPlace = (car: ICar): HTMLElement => {
  const carSVG = creatorElement({ tag: 'div', className: ['car-svg'] });
  const carPlace: HTMLDivElement = creatorElement({ tag: 'div', className: ['car-place'] }) as HTMLDivElement;
  const buttonsBlock: HTMLDivElement = creatorElement({ tag: 'div', className: ['car-place__buttons'] }) as HTMLDivElement;
  const carName: HTMLParagraphElement = creatorElement({ tag: 'p', className: ['car__name'] }) as HTMLParagraphElement;
  const selectBtn = creatorElement({ tag: 'button', className: ['car__select', 'buttons'], innerHTML: 'SELECT' }) as HTMLButtonElement;
  selectBtn.addEventListener('click', (event: MouseEvent) => selectCarHandler(event, car));
  const removeBtn = creatorElement({ tag: 'button', className: ['car__remove', 'buttons'], innerHTML: 'REMOVE' }) as HTMLButtonElement;
  removeBtn.addEventListener('click', () => removeCarHandler(car.id as number));
  const startBtn = creatorElement({ tag: 'button', className: ['car__start', 'buttons'], innerHTML: 'GO' }) as HTMLButtonElement;
  startBtn.addEventListener('click', (event) => startCarHandler(event, car.id as number, 'started'));
  const stopBtn = creatorElement(
    { tag: 'button', className: ['car__stop', 'buttons', 'disable'], innerHTML: 'STOP' },
  ) as HTMLButtonElement;
  stopBtn.addEventListener('click', (event) => stopCarHandler(event, car.id as number, 'stopped'));
  stopBtn.disabled = true;
  buttonsBlock.append(
    selectBtn,
    removeBtn,
    startBtn,
    stopBtn,
  );
  const flag: HTMLElement = creatorElement({ tag: 'div', className: ['flag'] });
  const colorCar = car.color ?? '#ffffff';
  carSVG.innerHTML = getCarSVG(colorCar);
  carName.textContent = car.name ?? 'No name';
  carPlace.id = `${car.id}`;

  carPlace.append(
    carName,
    buttonsBlock,
    carSVG,
    flag,
  );
  return carPlace;
};

const updateCarInGarage = (carId: number, updateName: string, updateColor: string) => {
  const carPlace = document.getElementById(`${carId}`);
  const SVG = carPlace?.querySelector('svg g') as SVGAElement;
  SVG?.setAttribute('fill', updateColor);
  const nameCar = carPlace?.querySelector('p');
  if (nameCar) {
    nameCar.textContent = updateName;
  }
};

const updateCarInWinner = (carId: number, updateName: string, updateColor: string) => {
  const carWinner = document.querySelectorAll('.winner-number');
  carWinner.forEach((carNum) => {
    if (carNum.textContent === carId.toString()) {
      const winner = carNum.parentElement?.querySelector('.winner-car');
      const SVG = winner?.querySelector('svg g') as SVGAElement;
      SVG?.setAttribute('fill', updateColor);
      const nameCar = carNum.parentElement?.querySelector('.winner-name');
      if (nameCar) {
        nameCar.textContent = updateName;
      }
    }
  });
};

const updateCarHandler = (event: MouseEvent) => {
  event.preventDefault();
  const selectBtn = document.querySelector('.car__select.disable') as HTMLButtonElement;
  const allSelectBtn = document.querySelectorAll('.car__select') as NodeListOf<Element>;
  const carId = Number(selectBtn?.parentElement?.parentElement?.id);
  const textForm = document.querySelector('.update-form__text') as HTMLInputElement;
  const updateName: string = textForm.value;
  const colorForm = document.querySelector('.update-form__color') as HTMLInputElement;
  const updateColor: string = colorForm.value;
  const updateBtn = document.querySelector('.update-form__button') as HTMLInputElement;
  allSelectBtn.forEach((btn) => {
    activeElement(btn as HTMLButtonElement);
  });
  disableElement(textForm);
  disableElement(updateBtn);
  if (carId) {
    updateCarOnServer(carId, { name: updateName, color: updateColor });
  }
  updateCarInGarage(carId, updateName, updateColor);
  updateCarInWinner(carId, updateName, updateColor);
  textForm.value = '';
};

export const viewCarsPlaces = async (): Promise<void> => {
  const garageName: HTMLHeadingElement = document.querySelector('.garage-page__name') as HTMLHeadingElement;
  const carsContainer: HTMLDivElement = document.querySelector('.cars') as HTMLDivElement;
  const updateBtn = document.querySelector('.update-form__button') as HTMLButtonElement;
  const carsOnServer = await getAllCars({ page: pageNum.number, limit: quantityCarOnPage });
  const carsNumber: number = carsOnServer.quantityCars;
  garageName.textContent = `Garage (${carsNumber})`;
  carsContainer.innerHTML = '';
  carsOnServer.items.forEach((car) => {
    const newCar = createCarPlace(car);
    carsContainer.append(newCar);
  });
  updateBtn.addEventListener('click', (event) => updateCarHandler(event));
};

const viewGaragePagination = (): void => {
  const garageContainer = document.querySelector('.cars-container') as HTMLElement;
  const prevBtn = creatorElement({ tag: 'button', className: ['prev-garage-btn', 'buttons'], innerHTML: 'PREV' }) as HTMLButtonElement;
  const netBtn = creatorElement({ tag: 'button', className: ['next-garage-btn', 'buttons'], innerHTML: 'NEXT' }) as HTMLButtonElement;

  garageContainer.append(prevBtn, netBtn);
};

export const viewGaragePage = ():void => {
  createGarage();
  viewBlockForms();
  viewCarsPlaces();
  viewGaragePagination();
};
