import icons from 'url:../../imgs/icons.svg';

import { pathPictureW220, getVoteAverage } from '../shared/helpers.js';

class WishlistView {
  _data;
  _parentElement = document.querySelector('.wishlist__list');
  _btnElement = document.querySelector('.wishlist__btn');

  constructor() {

  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // render card movie
  render(data) {
    this._data = data;
    // lấy đánh dấu
    let markup;
    if (data.length == 0) {
      markup = this._generateMarkupEmpty();
      this._btnElement.classList.add('hidden');
    } else {
      markup = this._generateMarkup();
      this._btnElement.classList.remove('hidden');
    }
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRemoveCard(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.card__btn--remove');
      if(!btn) return ;
      const id = btn.dataset.id;
      handler(id);
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(movie) {
    return /*html */ `
      <div class="popupWishlist__card">
        <a href="./detail.html#${movie.id}" class="card__link movie__poster">
          <img src="${pathPictureW220(movie.posterPath)}" alt="${movie.title}" loading="lazy" />
        </a>

        <div class="wrapper">
          <a href="./detail.html#${movie.id}" class="card__link">${movie.title}</a>
          <p class="wrap">
            <span class="">
              <span class="movie__rate">${getVoteAverage(movie.voteAverage)}</span>
              <svg class="star__icon">
                <use href="${icons}#icon-star-fill"></use>
              </svg>
            </span>
            <span class="movie__price">80.000 đ</span>
          </p>
        </div>

        <button data-id="${movie.id}" class="card__btn card__btn--remove">
          <svg class="card__icon">
            <use href="${icons}#icon-dismiss"></use>
          </svg>
        </button>
      </div>
    `;
  }

  _generateMarkupEmpty() {
    return /*html */ `
      <div class="wishlist__empty">
        <svg class="wishlist__icon">
          <use href="${icons}#icon-list-empty"></use>
        </svg>
        <p class="wishlist__message">Oops!<br />Bạn hãy chọn phim yêu thích!</p>
      </div>
    `;
  }
}

export default new WishlistView();