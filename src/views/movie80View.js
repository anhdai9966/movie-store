import View from './View.js';
import { pathPictureW220 } from '../shared/helpers.js';

class BannerView extends View {
  _parentElement = document.querySelector('.grid__wrapper');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="card__grid">${this._data.map(this._generateMarkupPreview).join('')}</div>

      <div class="card__grid">${this._data.map(this._generateMarkupPreview).join('')}</div>
    `;
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <div class="banner-card__item">
        <a href="./detail.html#${movie.id}" class="movie__link">
          <img src="${pathPictureW220(movie.posterPath)}" class="movie__poster" loading="lazy" alt="${movie.title}">

          <div class="card__overlay"></div>

          <h6 class="movie__title">${movie.title}</h6>
        </a>
      </div>
    `;
  }
}

export default new BannerView();