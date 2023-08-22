import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';
import HamburgerMenu from './hamburger-menu/hamburger-menu';
import ChangeLevelGame from './game-levels/change-level';
import gameObj from './game-levels/game-objects.json';

export default class App {
  private level: number;

  private cssEditor: ace.Ace.Editor = ace.edit('edit-css');

  public constructor(level: number) {
    this.level = level;
  }

  public hamburgerMenu(): void {
    const menu: HamburgerMenu = new HamburgerMenu(this.level);
    menu.openCloseMenu();
  }

  public startGame() {
    const start: ChangeLevelGame = new ChangeLevelGame(this.level);
    start.game();
    this.changeLevel();
  }

  private changeLevel(): void {
    document.body.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && this.cssEditor.session.getLine(0) === gameObj[this.level].winLevel) {
        this.level += 1;
        const start: ChangeLevelGame = new ChangeLevelGame(this.level);
        start.cleaningLevel();
        start.viewElementsInGame(this.level);
        this.cssEditor.session.removeFullLines(0, 0);
      }
    });
  }

  public levelIndicator() {
    const menu: HTMLDivElement | null = document.querySelector('.menu');
    if (menu) {
      const levels: NodeListOf<ChildNode> | undefined = document.querySelector('.menu')?.childNodes;
      if (levels) {
        levels.forEach((level) => {
          const levelNum = level as HTMLElement;
          levelNum.style.color = '#ffffff';
        });
        const levelElement = levels[this.level] as HTMLElement;
        levelElement.style.color = '#2ee343';
      }
    }
  }
}
