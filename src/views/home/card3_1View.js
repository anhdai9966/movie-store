import HomeView from './homeView.js';

import icons from 'url:../../images/icons.svg';

export default class Card3_1View extends HomeView {
  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(news) {
    return /*html */ `
      <li class="card__item">
        <a href="./news.html#${news.id}" class="card__link">
          <img
          src="${news.imageUrl}"
          alt="${news.title}"
          loading="lazy"
          class="card__img"
          />

          <h6 class="card__title">${news.title}</h6>
        </a>
      </li>
    `;
  }
}
