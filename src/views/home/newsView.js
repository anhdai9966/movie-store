import Card3_1View from './card3_1View.js';

class PopularView extends Card3_1View {
  _grandparentElement = document.querySelector('.home-news');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
  }
}
export default new PopularView();
