import logoRss from '../../img/logo.png';
import { IAll, IWinner } from '../../types/types';
import { getAllWinners, getCar } from '../../app/api/api-methods';
import creatorElement from '../../app/helpers';
import getCarSVG from '../view-garage/get-car';

export const winnerPage = {
  number: 1,
};
export const limitWinners = 10;

const createWinnerPage = (): void => {
  const body: HTMLElement | null = document.querySelector('body');
  const winnersPage = creatorElement({ tag: 'div', className: ['winners-page', 'hidden'] });
  const pageName: HTMLHeadingElement = creatorElement({ tag: 'h1', className: ['winners-page__name', 'page-name'], innerHTML: 'Winners' }) as HTMLHeadingElement;
  const pageNumber: HTMLHeadingElement = creatorElement({
    tag: 'h3',
    className: ['winner-page__num', 'page-num'],
    innerHTML: 'Page #1',
  }) as HTMLHeadingElement;
  const tableWinners: HTMLTableElement = creatorElement({ tag: 'table', className: ['table-winners'] }) as HTMLTableElement;
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

  pageNumber.textContent = 'Page ';

  rssLink.append(logo);
  footer.append(rssLink, gitLink);
  winnersPage.append(
    pageName,
    pageNumber,
    tableWinners,
    footer,
  );
  body?.append(winnersPage);
};

export const viewWinners = async (): Promise<void> => {
  const tableWinners: HTMLTableElement = document.querySelector('.table-winners') as HTMLTableElement;
  const pageName: HTMLHeadingElement = document.querySelector('.winners-page__name') as HTMLHeadingElement;
  tableWinners.innerHTML = `
    <table>
      <thead>
        <th id='number' class='winners__number'>Id Car</th>
        <th id='car' class='winners__car'>Car</th>
        <th id='name' class='winners__name'>Model</th>
        <th id='quantity' class='winners__quantity'>Wins</th>
        <th id='time' class='winners__time'>Best time (sec)</th>
      </thead>
      <tbody>
      </tbody>
    </table>`;
  const winners: IAll = await getAllWinners({
    page: winnerPage.number,
    limit: limitWinners,
    sort: 'time',
    order: 'ASC',
  });
  const winsNumber: number = winners.quantityCars;
  pageName.textContent = `Winners (${winsNumber})`;
  const allWinners = winners.items;
  allWinners.forEach((winner: IWinner) => {
    const row: HTMLTableRowElement = document.createElement('tr');
    const id: HTMLTableCellElement = document.createElement('td');
    const carSVG: HTMLTableCellElement = document.createElement('td');
    const model: HTMLTableCellElement = document.createElement('td');
    const wins: HTMLTableCellElement = document.createElement('td');
    const time: HTMLTableCellElement = document.createElement('td');
    id.classList.add('winner-number');
    carSVG.classList.add('winner-car');
    model.classList.add('winner-name');
    wins.classList.add('winner-quantity');
    time.classList.add('winner-tim');
    const carId = winner.id;
    getCar(carId).then((winCar) => {
      model.textContent = `${winCar.name}`;
      carSVG.innerHTML = `${getCarSVG(winCar.color)}`;
    });
    id.textContent = `${winner.id}`;
    wins.textContent = `${winner.wins}`;
    time.textContent = `${winner.time}`;
    row.append(
      id,
      carSVG,
      model,
      wins,
      time,
    );
    tableWinners.append(row);
  });
};

const viewWinnerPagination = (): void => {
  const table: HTMLElement = document.querySelector('.table-winners') as HTMLElement;
  const paginationButtons: HTMLButtonElement[] = [
    creatorElement({ tag: 'button', className: ['next-winner-btn', 'buttons'], innerHTML: 'NEXT' }) as HTMLButtonElement,
    creatorElement({ tag: 'button', className: ['prev-winner-btn', 'buttons'], innerHTML: 'PREV' }) as HTMLButtonElement,
  ];

  paginationButtons.forEach((btn) => {
    table.after(btn);
  });
};

const viewWinnersPage = () => {
  createWinnerPage();
  viewWinners();
  viewWinnerPagination();
};
export default viewWinnersPage;
