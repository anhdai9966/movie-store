import View from '../View.js';
import { pathPictureW220, pathPictureW533, getVoteAverage, getGenresId, numberWithCommas } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

class DetailRecommendationsView extends View {
  _parentElement = document.querySelector('.detail__recommendations_list');
  _linkRecommendation = document.querySelector('.recommendations__link');
  _linkSimilar = document.querySelector('.similar__link');

  constructor() {
    super();
    this._addHanlerLinkRecom();
    this._addHanlerLinkSimiler();
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _addHanlerLinkRecom() {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, () => {
      const id = window.location.hash.slice(1);
      this._linkRecommendation.setAttribute('href', `./movie.html#movie/${id}/recommendations`)
    }))
  }

  _addHanlerLinkSimiler() {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, () => {
      const id = window.location.hash.slice(1);
      this._linkSimilar.setAttribute('href', `./movie.html#movie/${id}/similar`)
    }))
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html*/ `
      <li class="card__item">
        <div class="card__wrapper">
          <a href="./detail.html#${movie.id}" class="card__link card__link-poster">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__img-poster"
            />
          </a>

          <a href="./detail.html#${movie.id}" class="card__link card__link-backdrop">
            <img
              src="${pathPictureW533(movie.backdropPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__img-backdrop"
            />
          </a>
          
          <button data-title="${movie.originalTitle}" class="card__btn card__btn-trailer  card__btn-trailer--open">
            <svg class="card__icon">
              <use href='${icons}#icon-play-circle'></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap">
          <a href="./detail.html#${movie.id}" class="">
            <h6 class="card__title">${movie.title}</h6>
          </a>

          <p class=""><span>${getGenresId(movie.genreIds[0])}</span>, <span>${getGenresId(movie.genreIds[1])}</span></p>

          <p>
            <span>
              <span>${getVoteAverage(movie.voteAverage)}</span>

              <svg class="star__icon">
                <use href="${icons}#icon-star-fill"></use>
              </svg>
            </span>

            <span>${numberWithCommas(movie.price.rent)} đ</span>
          </p>
        </div>
      </li>
    `;
  }
}

export default new DetailRecommendationsView();