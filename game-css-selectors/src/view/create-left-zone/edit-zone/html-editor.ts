import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';

export default class HtmlEditor {
  public editor(): void {
    const htmlEditor: ace.Ace.Editor = ace.edit('edit-html');
    htmlEditor.setOptions({
      useWorker: false,
      fontSize: 20,
      mode: 'ace/mode/html',
    });
    htmlEditor.setTheme('ace/theme/chaos');
  }
}
