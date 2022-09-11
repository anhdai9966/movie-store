import HomeView from './homeView.js';

import icons from 'url:../../images/icons.svg';

export default class Card3View extends HomeView {
  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(trailer) {
    return /*html */ `
      <li class="card__item">
        <button data-title="${trailer.title}" class="card__btn card__btn-trailer--open">
          <img
          src="${trailer.thumbnails}"
          alt="${trailer.title}"
          loading="lazy"
          class="card__img"
          />
          
          <svg class="card__icon">
            <use href='${icons}#icon-play'></use>
          </svg>
        </button>
        
        <h6 class="card__title">${trailer.title}</h6>
      </li>
    `;
  }
}
