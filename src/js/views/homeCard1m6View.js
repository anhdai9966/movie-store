import homeView from './homeView';

import { pathPictureW220, pathPictureW533, getGenresId, getYear, getVoteAverage } from '../shared/helpers.js';

import icons from 'url:../../imgs/icons.svg';

class HomeCard1m6View extends homeView {
  _parentElement = document.querySelector('.cardHome1-6');
  _cardListElement = this._parentElement.querySelector('.card__list');
  _leftBtn = this._parentElement.querySelector('.left__btn');
  _rightBtn = this._parentElement.querySelector('.right__btn');


  constructor() {
    super();
  }

  //  xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  renderCard2(data) {
    this._data = data;

    let markup = this._generateMarkup2();
    this._cardListElement.innerHTML = '';
    // render nội dung mới
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
    // khi render ra thì thêm sự kiện
    this._addHandlerHoverOver();
    this._addHandlerClickControlRight();
    this._addHandlerClickControlLeft();
  }

  _generateMarkup2() {
    return this._data.map(this._generateMarkupCard2).join('');
  }

  _generateMarkupCard2(movie) {
    return /*html */ `
      <div class="card__item">
        <div class="card__image">
          <a href="./detail.html#${movie.id}" class="card__img-link">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__poster"
            />
          </a>

          <div class="card__hover">
            <a href="./detail.html#${movie.id}" class="card__img-link">
              <img
                src="${pathPictureW533(movie.backdropPath)}"
                alt="${movie.title}"
                loading="lazy"
                class="card__backdrop"
              />
            </a>

            <div class="card__overlay"></div>

            <button class="card__btn-wishlist card__btn--wishlist">
              <svg class="card__icon">
                <use href="${icons}#icon-bookmark"></use>
              </svg>
            </button>

            <div class="card__hover-info">
              <a href="./detail.html#${movie.id}" class="card__link">
                <h6 class="card__hover-title">${movie.title}</h6>
              </a>

              <p class="card__hover-info2">
                <span>${getGenresId(movie.genreIds[0])}</span> - <span>${getYear(movie.releaseDate)}</span> - <span>Chỉ từ 80.000 đ</span>
              </p>

              <button data-title="${movie.originalTitle}" class="card__link-btn card__btn--trailer">Trailer</button>
            </div>
          </div>
        </div>

        <div class="card__info">
          <a href="./detail.html#${movie.id}" class="card__link">
            <h6 class="card__title">${movie.title}</h6>
          </a>

          <p class="card__title">
            <span>${getVoteAverage(movie.voteAverage)}</span>

            <svg class="star__icon">
              <use href="${icons}#icon-star-fill"></use>
            </svg>
          </p>
        </div>
      </div>
    `;
  }
}

export default new HomeCard1m6View();
