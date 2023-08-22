import './hamburger-style.css';

export default class HamburgerMenu {
  private levels = 10;

  private level: number;

  private isOpen = false;

  private hamburger: Element | null = document.querySelector('.level-menu');

  private rightZone: Element | null = document.querySelector('.right-zone');

  private description: Element | null = document.querySelector('.description');

  public constructor(level: number) {
    this.level = level;
  }

  public openCloseMenu(): void {
    const menu: HTMLDivElement = document.createElement('div');

    menu.classList.add('menu');

    for (let i = 0; i < this.levels; i += 1) {
      const viewLevel = document.createElement('p');

      const levelNum = `Level ${i + 1}`;
      viewLevel.className = `level-${i + 1}`;
      viewLevel.textContent = levelNum;
      menu.append(viewLevel);
    }

    this.hamburger?.addEventListener('click', () => {
      this.description?.classList.toggle('hidden');
      if (this.isOpen) {
        if (menu !== null) {
          this.hamburger?.classList.remove('open');
          this.rightZone?.removeChild(menu);
          this.isOpen = false;
        }
      } else {
        this.hamburger?.classList.add('open');
        this.rightZone?.append(menu);
        this.isOpen = true;
      }
    });
  }
}
