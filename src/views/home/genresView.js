import Card5View from './card5View.js';

class PopularView extends Card5View {
  _grandparentElement = document.querySelector('.home-genres');
  _parentElement = this._grandparentElement.querySelector('.card__list');

  constructor() {
    super();
  }

  addHandlerClickAllView(handler) {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.home__btn-genres--open');
      if (!btn) return ;
      handler();
    })
  }
}
export default new PopularView();
