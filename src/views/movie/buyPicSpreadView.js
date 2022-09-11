import View from '../View.js';

import { pathPictureW220 } from '../../shared/helpers.js';

class PicSpreadView extends View {
  _parentElement = document.querySelector('.pic-spread__list');

  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <li class="pic-spread__item">
        <a href="./detail.html#${movie.id}" class="pic-spread__link">
          <img src="${pathPictureW220(movie.posterPath)}" alt="${movie.title}" class="pic-spread__img" />
        </a>
      </li>
    `;
  }
}

export default new PicSpreadView();