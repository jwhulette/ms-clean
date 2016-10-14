'use babel';

import MsCleanView from './ms-clean-view';
import { CompositeDisposable } from 'atom';

export default {

  msCleanView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.msCleanView = new MsCleanView(state.msCleanViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.msCleanView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ms-clean:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.msCleanView.destroy();
  },

  serialize() {
    return {
      msCleanViewState: this.msCleanView.serialize()
    };
  },

  toggle() {
    console.log('MsClean was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
