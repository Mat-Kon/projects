import { ICreateElement } from '../types/types';

export default function creatorElement(options: ICreateElement): HTMLElement | HTMLDivElement {
  const element = document.createElement(`${options.tag}`);
  element.className = `${options.className.join(' ')}`;
  element.innerHTML = options.innerHTML ? options.innerHTML : '';
  return element;
}

export const disableElement = (elem: HTMLButtonElement | HTMLInputElement): void => {
  const htmlElem = elem;
  htmlElem.classList.add('disable');
  htmlElem.disabled = true;
};

export const activeElement = (elem: HTMLButtonElement | HTMLInputElement): void => {
  const htmlElem = elem;
  htmlElem.classList.remove('disable');
  htmlElem.disabled = false;
};
