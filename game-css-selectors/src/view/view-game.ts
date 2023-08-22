import * as LeftZone from './create-left-zone/view-left-zone';
import * as RightZone from './create-right-zone/right-zone';
import CssEditor from './create-left-zone/edit-zone/css-editor';
import HtmlEditor from './create-left-zone/edit-zone/html-editor';

const body: HTMLElement | null = document.querySelector('body');
body?.classList.add('body-wrapper');

LeftZone.viewLeftHeader();
LeftZone.viewTableZone();
LeftZone.viewEditZone();
LeftZone.viewFooter();

RightZone.viewRightHeader();

export default class ViewGame {
  public viewGame(): void {
    if (body !== null) {
      const editCss: CssEditor = new CssEditor();
      const editHtml: HtmlEditor = new HtmlEditor();

      editCss.editor();
      editHtml.editor();
    }
  }
}
