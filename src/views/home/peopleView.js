import Card4View from './card4View.js';

class PopularView extends Card4View {
  _grandparentElement = document.querySelector('.home-people');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
  }
}
export default new PopularView();
