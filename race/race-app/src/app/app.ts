import addCar from './garage/create-car';
import pagination from './garage/garage-pagination';
import addHundredCars from './garage/generate-hundred-cars';
import changePage from './header/header';
import paginationWinners from './winners/winners-pagination';

const app = (): void => {
  changePage();
  pagination();
  addCar();
  addHundredCars();
  paginationWinners();
};
export default app;
