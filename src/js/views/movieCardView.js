import { pathPictureW220, pathPictureW533, getVoteAverage, getOverview } from '../shared/helpers.js';

import icons from 'url:../../imgs/icons.svg'; // Parcel 2

class MovieCardView {
  _data;
  _parentElement = document.querySelector('.card__grid');

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerClickTrailer(handler) {
    document.addEventListener('click', (e) => {
      const trailerBtn = e.target.closest('.card__btn--trailer');
      if(!trailerBtn) return ;
      e.preventDefault();
      const title = trailerBtn.dataset.title
      handler(title);
    })
  }

  // giao diện chờ
  renderSpinner() {
    const markup = /*html*/ `
    <div class="spinner__render">
    <ul class="spinner">
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
    </ul>
  </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(movie) {
    return /*html */`
      <div class="card-movie-2__item">
        <div class="first">
          <a href="./detail.html#${movie.id}" class="movie__poster movie__link">
            <img src="${pathPictureW220(movie.posterPath)}" alt="movie" loading="lazy">
          </a>
          <a href="./detail.html#${movie.id}" class="movie__backdrop movie__link">
            <img src="${pathPictureW533(movie.backdropPath)}" alt="movie" loading="lazy">
          </a>

          <button class="wishlist__btn">
            <svg class="wishlist__icon">
              <use href='${icons}#icon-bookmark'></use>
            </svg>
          </button>

          <button data-title="${movie.originalTitle}" class="trailer__link card__btn--trailer">
            <svg class="play__icon">
              <use href='${icons}#icon-play-circle'></use>
            </svg>
          </button>

          <p class="movie__overview">${getOverview(movie.overview)}</p>
        </div>

        <div class="end">
          <a href="./detail.html#${movie.id}" class="movie__title">${movie.title}</a>

          <p class="movie__overview">${getOverview(movie.overview)}</p>

          <p class="wrapper">
            <span>
              <span class="movie__vote-average">${getVoteAverage(movie.voteAverage)}</span>

              <svg class="star__icon">
                <use href='${icons}#icon-star-fill'></use>
              </svg>
            </span>

            <span class="movie__price">80.000 đ</span>
          </p>
        </div>
      </div>
    `;
  }
}

export default new MovieCardView();
