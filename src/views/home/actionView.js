import Card1View from './card1View.js';

class ActionView extends Card1View {
  _grandparentElement = document.querySelector('.home-action');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
    this._addHandlerCardMouseover();
  }
  
}
export default new ActionView();
