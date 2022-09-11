import View from '../View.js';
import { pathPictureW220 } from '../../shared/helpers.js';

class Movie2View extends View {
  _parentElement = document.querySelector('.section-1__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <div class="pic__item">
        <a href="./detail.html#${movie.id}" class="pic__link">
          <img src="${pathPictureW220(movie.posterPath)}" loading="lazy" alt="${movie.title}" />

          <div class="pic__overlay"></div>

          <h6 class="pic__title">${movie.title}</h6>
        </a>
      </div>
    `;
  }
}

export default new Movie2View();