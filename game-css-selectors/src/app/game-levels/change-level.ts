import ace from 'ace-builds';
import './levels-style.css';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';
import gameObj from './game-objects.json';

export default class ChangeLevelGame {
  private level: number;

  private levelView: HTMLElement | null = document.querySelector('.level-num');

  private order: HTMLElement | null = document.querySelector('.order');

  private table: HTMLElement | null = document.querySelector('.table');

  private rightZone: HTMLElement | null = document.querySelector('.right-zone');

  private cssEditor: ace.Ace.Editor = ace.edit('edit-css');

  private htmlEditor: ace.Ace.Editor = ace.edit('edit-html');

  public constructor(level: number) {
    this.level = level;
  }

  public game(): void {
    this.viewElementsInGame(this.level);
    this.viewerLevelNum(this.level);
  }

  public viewElementsInGame(level: number): void {
    /* Я понимаю что gameObj должен быть тут вторым аргументом,
    но я не смог найти  подходящий тип, что бы его указать. */

    const quantityObjects: number | undefined = gameObj[level].quantityCreateObj;
    const tag = `${gameObj[level].tag}`;
    const className = gameObj[level].className.split(' ');
    const objects: HTMLElement[] = [];
    const description: HTMLParagraphElement = document.createElement('p');

    description.textContent = gameObj[level].descriptions;

    if (this.order !== null) {
      this.order.textContent = gameObj[level].order;
    }

    if (quantityObjects) {
      for (let i = 0; i < quantityObjects; i += 1) {
        const elem: HTMLElement = document.createElement(tag);
        objects.push(elem);
      }
    }

    description.classList.add('description');
    objects.forEach((elem) => {
      className.forEach((name) => {
        elem.classList.add(name);
      });
      this.table?.append(elem);
    });
    this.rightZone?.append(description);

    this.viewCssEditor();
    this.viewHtmlEditor(level);
    this.setAnimationToElement(level);
    this.viewerLevelNum(level);
  }

  private viewCssEditor() {
    const cssEditorContent = '\n{\n/*Styles would go here*/\n}';
    this.cssEditor.setValue(cssEditorContent);
    this.cssEditor.gotoLine(0, 0, true);
  }

  private viewHtmlEditor(level: number) {
    this.htmlEditor.setValue(gameObj[level].htmlEditorValue);
    this.htmlEditor.setReadOnly(true);
  }

  public cleaningLevel() {
    const description: HTMLParagraphElement | null = document.querySelector('.description');

    if (this.table !== null) {
      while (this.table.firstChild) {
        this.table.removeChild(this.table.firstChild);
      }
    }
    if (description !== null) {
      this.rightZone?.removeChild(description);
    }
  }

  private viewerLevelNum(levelNum: number) {
    const level = levelNum;

    if (this.levelView !== null) {
      const levelInHead = `Level ${gameObj[level].level}`;
      this.levelView.textContent = levelInHead;
    }
  }

  private setAnimationToElement(level: number) {
    const elements: HTMLCollection | undefined = this.table?.children;
    const animationToPlate = 'toPlate 1s infinite';
    const animationToApple = 'toApple 1s infinite';

    if (elements && level === 0) {
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].classList.contains('plate')) {
          const plate = elements[i] as HTMLElement;
          plate.style.animation = animationToPlate;
        }
      }
    }
    if (elements && level === 1) {
      const apple = elements[1] as HTMLElement;
      apple.style.position = 'absolute';
      apple.style.animation = animationToApple;
    }
    if (elements && level === 2) {
      const plate = elements[0] as HTMLElement;
      plate.style.position = 'absolute';
      plate.style.animation = animationToPlate;
    }
  }
}
