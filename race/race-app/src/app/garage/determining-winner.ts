import { viewWinners } from '../../view/view-winner/view-winners';
import { ICar, IWinner } from '../../types/types';
import { getWinner, createWinner, updateWinner } from '../api/api-methods';
import creatorElement from '../helpers';

export const whoWinner = (setId: number): HTMLElement | null => {
  const carsPlaces = document.querySelector('.cars')?.childNodes;
  let winner = null;
  carsPlaces?.forEach((car) => {
    const carPlace = car as HTMLElement;
    const width = carPlace?.offsetWidth ?? 0;
    const svgContainer = carPlace?.querySelector('.car-svg') as HTMLElement;
    const finish = width - 190;
    const rect = svgContainer.getBoundingClientRect();
    const locCar = Math.floor(rect.left ?? 0);
    if (locCar >= finish) {
      winner = carPlace;
      clearInterval(setId);
    }
  });
  return winner;
};

const getWinnerTime = (winnerElement: HTMLElement): number => {
  const carPlace = winnerElement;
  const carSVG = carPlace?.querySelector('.car-svg') as HTMLElement;
  const styles = window.getComputedStyle(carSVG);
  const transitionValues = styles.getPropertyValue('transition');
  const transitionValuesArray = transitionValues.split(' ');
  let time = 0;
  transitionValuesArray.forEach((value) => {
    if (value.includes('s')) {
      let newTime = parseFloat(value);
      newTime = parseFloat(newTime.toFixed(2));
      if (newTime > time) {
        time = newTime;
      }
    }
  });
  return time;
};

const addWinner = (winnerElement: HTMLElement) => {
  const carElement = winnerElement;
  const timeWinner = getWinnerTime(winnerElement) as number;
  const carParameters: ICar = {
    name: carElement?.querySelector('p')?.textContent as string,
    color: carElement?.querySelector('svg g')?.getAttribute('fill') as string,
    id: Number(carElement?.id),
  };
  createWinner({ id: carParameters.id as number, wins: 1, time: timeWinner });
  viewWinners();
};

export const winnerCar = () => {
  const carsContainer = document.querySelector('.cars');
  const interval = setInterval(() => {
    const winner = whoWinner(interval);
    if (winner !== null) {
      const winnerElem = winner;
      const winnerId = Number(winnerElem?.id);
      const winnerName = winnerElem?.querySelector('p')?.textContent;
      const winnerTime = getWinnerTime(winnerElem);
      const popup = creatorElement({ tag: 'p', className: ['popup'], innerHTML: `Car ${winnerName} is Win! Time ${winnerTime}sec` });
      getWinner(winnerId)
        .then((data) => {
          if (data === false) {
            addWinner(winnerElem);
          }
          const updateWinnerData = data as IWinner;
          const { wins, time, id } = updateWinnerData;
          let updateTime = time;
          const updateWins = wins + 1;
          if (winnerTime < time) {
            updateTime = winnerTime;
            updateWinner(id, { wins: updateWins, time: updateTime });
          } else {
            updateWinner(id, { wins: updateWins, time: updateTime });
          }
        });
      carsContainer?.append(popup);
      setTimeout(() => {
        carsContainer?.removeChild(popup);
      }, 3000);
    }
  }, 50);
};
