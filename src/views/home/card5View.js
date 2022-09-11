import HomeView from './homeView.js';

import { randomColor } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

export default class Card4View extends HomeView {
  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(genre) {
    return /*html */ `
      <li class="card__item">
        <a href="./movie.html#with_genres=${genre.id}" class="card__link" style="background: linear-gradient(222deg, ${randomColor()} 0%, ${randomColor()} 100%);">
          <p class="card__title">${genre.name}</p>
        </a> 
      </li>
    `;
  }
}
