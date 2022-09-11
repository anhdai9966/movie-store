import CardView from './cardView.js';

class myHistoryView extends CardView {
  _grandParentElement = document.querySelector('.account__history');
  _parentElement = this._grandParentElement.querySelector('.card__grid')
}

export default new myHistoryView();