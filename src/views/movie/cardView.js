import View from '../View.js';

import { pathPictureW220, pathPictureW533, getVoteAverage, numberWithCommas, getOverview } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

class CardView extends View {
  _parentElement = document.querySelector('.card__grid');

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.card__btn-wishlist');
      if (!btn) return ;
      const id = btn.dataset.id;
      handler(id);
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <li class="card__item">
        <div class="card__wrap">
          <a href="./detail.html#${movie.id}" class="card__link hidden-maw-md card__link-poster">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__img"
            />
          </a>

          <a href="./detail.html#${movie.id}" class="card__link hidden-miw-md card__link-backdrop">
            <img
              src="${pathPictureW533(movie.backdropPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__img"
            />
          </a>

          <button data-id="${movie.id}" class="card__btn card__btn-wishlist ${movie.purchased? 'hidden' : ''}">
            <svg class="card__icon card__icon-wishlist">
              <use href='${icons}#icon-bookmark${movie.bookmarked? '-fill': ''}'></use>
            </svg>
          </button>

          <button data-title="${movie.originalTitle}" class="card__btn card__btn-trailer card__btn-trailer--open">
            <svg class="card__icon card__icon-play">
              <use href="${icons}#icon-play-circle"></use>
            </svg>
          </button>

          <p class="card__overview card__overview-popup">
            ${getOverview(movie.overview)}
          </p>
        </div>

        <div class="card__wrap">
          <a href="./detail.html#${movie.id}" class="card__title">${movie.title}</a>

          <p class="card__overview hidden-miw-md">
            ${getOverview(movie.overview)}
          </p>

          <p class="">
            <span>
              <span class="">${getVoteAverage(movie.voteAverage)}</span>

              <svg class="star__icon">
                <use href="${icons}#icon-star-fill"></use>
              </svg>
            </span>

            <span class="card__price">${movie.purchased? 'Đã Mua' : `${numberWithCommas(movie.price.rent)} đ`}</span>
          </p>
        </div>
      </li>
    `;
  }
}

export default new CardView();