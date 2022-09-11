import Card1View from './card1View.js';

class HorrorView extends Card1View {
  _grandparentElement = document.querySelector('.home-horror');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
    this._addHandlerCardMouseover();
  }
}
export default new HorrorView();
