import './right-zone-style.css';

const body: HTMLElement | null = document.querySelector('body');
const rightGameZone: HTMLDivElement = document.createElement('div');

rightGameZone.classList.add('right-zone');
rightGameZone.classList.add('wrapper-right');

body?.append(rightGameZone);

export function creatorElement(
  tag: string,
  className: string,
  innerHTML = '',
) {
  const element: HTMLElement = document.createElement(`${tag}`);
  element.className = (`${className}`);
  element.innerHTML = `${innerHTML}`;
  return element;
}

export function viewRightHeader():void {
  const header: HTMLElement = creatorElement('div', 'header-right');
  const levelNum: HTMLElement = creatorElement('h2', 'level-num', '');
  const levelMenu: HTMLElement = creatorElement('div', 'level-menu');
  const menuLines: HTMLSpanElement[] = [
    creatorElement('span', 'level-menu__line'),
    creatorElement('span', 'level-menu__line'),
    creatorElement('span', 'level-menu__line'),
  ];

  header.append(levelNum, levelMenu);
  menuLines.forEach((line) => {
    levelMenu.append(line);
  });
  rightGameZone.append(header);
}
