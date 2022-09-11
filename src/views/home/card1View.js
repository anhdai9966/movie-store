import HomeView from './homeView.js';

import { pathPictureW220, pathPictureW533, getGenresId, getYear, getVoteAverage, numberWithCommas } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

export default class Card1View extends HomeView {
  constructor() {
    super();
  }

  _addHandlerCardMouseover() {
    this._parentElement.addEventListener('mouseover', (e) => {
      const cardItem = e.target.closest('.card__item');
      if (!cardItem) return ;
      
      if (cardItem == this._parentElement.firstElementChild) {
        this._parentElement.style.justifyContent = 'flex-start';
      }
      if (cardItem == this._parentElement.lastElementChild) {
        this._parentElement.style.justifyContent = 'flex-end';
      }
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <li class="card__item">
        <div class="card__wrapper">
          <a href="./detail.html#${movie.id}" class="card__link card__image">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__img-poster"
            />
          </a>

          <div class="card__hover">
            <a href="./detail.html#${movie.id}" class="card__link card__image">
              <img
                src="${pathPictureW533(movie.backdropPath)}"
                alt="${movie.title}"
                loading="lazy"
                class="card__img-backdrop"
              />
            </a>

            <div class="card__overlay"></div>

            <button data-id="" class="card__btn-wishlist card__btn-wishlist--toggle hidden">
              <svg class="card__icon-wishlist">
                <use href="./images/icons.svg#icon-bookmark"></use>
              </svg>
            </button>

            <div class="card__wrap card__hover-wrap">
              <a href="./detail.html#${movie.id}" class="card__link">
                <h6 class="card__title">${movie.title}</h6>
              </a>

              <p class="">
                <span>${getGenresId(movie.genreIds[0])}</span> - <span>${getYear(movie.releaseDate)}</span> - <span class="card__price">Chỉ từ ${numberWithCommas(movie.price.rent)} đ</span>
              </p>

              <button data-title="${movie.originalTitle}" class="btn-secondary card__btn card__btn-trailer--open">Trailer</button>
            </div>
          </div>
        </div>

        <div class="card__wrap">
          <a href="./detail.html#${movie.id}" class="card__link">
            <h6 class="card__title">${movie.title}</h6>
          </a>

          <p style="color: #737373;">
            <span>
              <span>${getVoteAverage(movie.voteAverage)}</span>

              <svg class="star__icon">
                <use href="${icons}#icon-star-fill"></use>
              </svg>
            </span>

            <span class="card__price">${numberWithCommas(movie.price.rent)} đ</span>
          </p>
        </div>
      </li>
    `;
  }
}
