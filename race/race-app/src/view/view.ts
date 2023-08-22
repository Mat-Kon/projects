import viewHeader from './view-header';
import { viewGaragePage } from './view-garage/view-garage';
import viewWinnersPage from './view-winner/view-winners';

const view = (): void => {
  viewHeader();
  viewGaragePage();
  viewWinnersPage();
};
export default view;
