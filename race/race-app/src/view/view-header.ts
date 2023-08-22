import creatorElement from '../app/helpers';

const body: HTMLBodyElement | null = document.querySelector('body');

const viewHeader = ():void => {
  const header: HTMLElement = creatorElement({ tag: 'header', className: ['header'] });
  const btnContainer: HTMLDivElement = creatorElement({ tag: 'div', className: ['btn-container'] }) as HTMLDivElement;
  const buttons: HTMLSpanElement[] = [
    creatorElement({ tag: 'button', className: ['garage-btn buttons'], innerHTML: 'Garage' }),
    creatorElement({ tag: 'button', className: ['winner-btn buttons'], innerHTML: 'Winner' }),
  ];

  buttons.forEach((btn) => {
    btnContainer.append(btn);
  });
  header.append(btnContainer);
  body?.prepend(header);
};
export default viewHeader;
