import HomeView from './homeView.js';

import { pathPictureW235 } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

export default class Card4View extends HomeView {
  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(people) {
    return /*html */ `
      <li class="card__item">
        <a href="./people.html#${people.id}" class="card__link">
          <img
            src="${pathPictureW235(people.profilePath)}"
            alt="${people.name}"
            loading="lazy"
            class="card__img"
          />

          <h6 class="">${people.name}"</h6>

          <p class="card__info">${people.knownFor.map(p => `<span>${p.title}</span>`).join(', ')}</p>
        </a> 
      </li>
    `;
  }
}
