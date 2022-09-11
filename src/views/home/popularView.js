import Card1View from './card1View.js';

class PopularView extends Card1View {
  _grandparentElement = document.querySelector('.home-popular');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
    this._addHandlerCardMouseover();
  }
}
export default new PopularView();
