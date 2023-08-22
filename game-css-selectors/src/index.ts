import './index.css';
import ViewGame from './view/view-game';
import App from './app/app';

const level = 0;

const viewGameZone = new ViewGame();
viewGameZone.viewGame();

const app = new App(level);
app.startGame();
app.hamburgerMenu();

const hamburgerBtn: HTMLDivElement | null = document.querySelector('.level-menu');
hamburgerBtn?.addEventListener('click', () => {
  app.levelIndicator();
});
