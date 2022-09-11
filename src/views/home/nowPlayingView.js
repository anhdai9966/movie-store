import Card2View from './card2View.js';

class PopularView extends Card2View {
  _grandparentElement = document.querySelector('.home-now-playing');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
  }
}
export default new PopularView();
