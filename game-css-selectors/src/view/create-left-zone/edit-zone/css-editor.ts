import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-css';

export default class CssEditor {
  public editor():void {
    const cssEditor: ace.Ace.Editor = ace.edit('edit-css');
    cssEditor.setOptions({
      useWorker: false,
      fontSize: 20,
      mode: 'ace/mode/css',
      maxLines: 5,
    });
    cssEditor.setValue('');
  }
}
