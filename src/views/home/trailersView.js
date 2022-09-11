import Card3View from './card3View.js';

class PopularView extends Card3View {
  _grandparentElement = document.querySelector('.home-trailers');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
  }
}
export default new PopularView();
