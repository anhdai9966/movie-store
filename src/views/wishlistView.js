import View from './View.js';
import icons from 'url:../images/icons.svg'; // Parcel 2

import { pathPictureW220, getVoteAverage, numberWithCommas } from '../shared/helpers.js';

class WishlistView extends View {
  _grandparentElement = document.querySelector('.header__wishlist');
  _parentElement = this._grandparentElement.querySelector('.card__list');
  _btn = this._grandparentElement.querySelector('.header__btn-wishlist');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerBtnRemove(handler) {
    this._grandparentElement.addEventListener('click', e => {
      const btn = e.target.closest('.card__btn--remove');
      if (!btn) return;
      const id = btn.dataset.id;
      handler(id);
    });
  }
  addHandlerBtnBuy(handler) {
    this._grandparentElement.addEventListener('click', e => {
      const btn = e.target.closest('.header__btn-wishlist--buy');
      if (!btn) return;
      handler();
    });
  }
  hiddenBtn() {
    this._btn.classList.add('hidden');
  }
  shownBtn() {
    this._btn.classList.remove('hidden');
  }

  _generateMarkup() {
    return this._data.length ? this._data.map(this._generateMarkupPreview).join('') : this._generateMarkupPreviewEmpty();
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <div class="card__item">
        <a href="./detail.html#${movie.id}" class="card__link card__image">
          <img src="${pathPictureW220(movie.posterPath)}" alt="${movie.title}" loading="lazy" />
        </a>

        <div class="card__wrapper">
          <a href="./detail.html#${movie.id}" class="card__link">${movie.title}</a>

          <p class="card__wrap">
            <span class="">
              <span class="">${getVoteAverage(movie.voteAverage)}</span>

              <svg class="star__icon">
                <use href="${icons}#icon-star-fill"></use>
              </svg>
            </span>

            <span class="">${numberWithCommas(movie.price.rent)} đ</span>
          </p>
        </div>

        <button data-id="${movie.id}" class="card__btn card__btn--remove">
          <svg class="header__icon">
            <use href="${icons}#icon-dismiss"></use>
          </svg>
        </button>
      </div>
    `;
  }

  _generateMarkupPreviewEmpty() {
    return /*html */ `
      <div class="header__wishlist-empty">
        <svg class="empty__icon">
          <use href="${icons}#icon-list-empty"></use>
        </svg>

        <p class="">Oops!<br />Bạn hãy chọn phim yêu thích!</p>
      </div>
    `;
  }
}

export default new WishlistView();
