import './left-zone-style.css';
import './header-left-style.css';
import './edit-style.css';
import './footer-style.css';
import './table-style.css';
import rssPng from '../../img/logo-rsschool3.png';

const body: HTMLElement | null = document.querySelector('body');

function creatorElement(
  tag: string,
  className: string,
  innerHTML = '',
): HTMLElement {
  const element: HTMLElement = document.createElement(`${tag}`);
  element.className = (`${className}`);
  element.innerHTML = `${innerHTML}`;
  return element;
}

// view left zone
const leftGameZone: HTMLDivElement = creatorElement('div', 'left-zone wrapper-left', '') as HTMLDivElement;
body?.append(leftGameZone);

// view header
export function viewLeftHeader(): void {
  const header: HTMLElement = creatorElement('header', 'header-left', '');
  const headLink: HTMLAnchorElement = creatorElement('a', 'header__link', '') as HTMLAnchorElement;
  const h1: HTMLHeadingElement = creatorElement('h1', 'heading', 'RSS CSS') as HTMLHeadingElement;

  headLink.href = './';

  headLink.append(h1);
  header.append(headLink);
  leftGameZone.append(header);
}

// view table zone
export function viewTableZone(): void {
  const tableZone:HTMLElement = creatorElement('div', 'table-zone', '');
  const h2: HTMLElement = creatorElement('h2', 'order', 'Order');
  const tableContainer: HTMLElement = creatorElement('div', 'table-container');
  const table: HTMLElement = creatorElement('div', 'table');
  const legs: HTMLElement = creatorElement('div', 'legs', '');
  const tableLegs: HTMLElement[] = [creatorElement('div', 'table__leg', ''), creatorElement('div', 'table__leg', '')];

  tableZone.append(
    h2,
    tableContainer,
  );
  tableContainer.append(table, legs);
  tableLegs.map((leg) => legs.append(leg));
  leftGameZone.append(tableZone);
}

// view edit zone
export function viewEditZone(): void {
  const edit: HTMLElement = creatorElement('div', 'edit', '');

  const cssEditor: HTMLElement = creatorElement('div', 'css-editor', '');
  const headerCssEditor: HTMLElement = creatorElement('div', 'css-editor__header edit__headers', 'CSS Editor');
  const fileNameCss: HTMLElement = creatorElement('span', 'file-name', 'style.css');
  const fileWindowCss: HTMLElement = creatorElement('div', 'file-window', '');

  fileWindowCss.id = 'edit-css';

  const htmlViewer: HTMLElement = creatorElement('div', 'html-viewer', '');
  const headerHtmlViewer: HTMLElement = creatorElement('div', 'html-viewer__header edit__headers', 'HTML Viewer');
  const fileNameHtml: HTMLElement = creatorElement('span', 'file-name', 'carpet.html');
  const fileWindowHtml: HTMLElement = creatorElement('div', 'file-window', '');

  fileWindowHtml.id = 'edit-html';

  cssEditor.append(headerCssEditor, fileWindowCss);
  headerCssEditor.append(fileNameCss);

  htmlViewer.append(headerHtmlViewer, fileWindowHtml);
  headerHtmlViewer.append(fileNameHtml);

  edit.append(cssEditor, htmlViewer);
  leftGameZone.append(edit);
}

// view footer
export function viewFooter(): void {
  const footer = creatorElement('footer', 'footer', '');
  const githubLink: HTMLAnchorElement = creatorElement('a', 'github', 'Github') as HTMLAnchorElement;
  const rssLink: HTMLAnchorElement = creatorElement('a', 'rss-link', '') as HTMLAnchorElement;
  const rssLogo: HTMLImageElement = new Image();

  rssLogo.src = rssPng;
  rssLogo.alt = 'logo RSS';
  rssLogo.width = 100;
  rssLogo.height = 40;
  rssLink.href = 'https://rs.school/';
  githubLink.href = 'https://github.com/Mat-Kon';
  githubLink.setAttribute('target', '_blank');
  rssLink.setAttribute('target', '_blank');
  rssLink.append(rssLogo);
  footer.append(rssLink, githubLink);
  leftGameZone.append(footer);
}
