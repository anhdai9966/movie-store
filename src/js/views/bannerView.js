import View from './View.js';
import { pathPictureW220 } from '../shared/helpers.js';

class BannerView extends View {
  _parentElement = document.querySelector('.banner');

  _gridWrapper = this._parentElement.querySelector('.grid__wrapper');

  _searchInput = this._parentElement.querySelector('.text__search');
  _placeholder = this._parentElement.querySelector('.placeholder');

  constructor() {
    super();
    this._addHandlerFocusInput();
    this._addHandlerBlurInput();
  }

  handlerFocusInput() {
    const placeholderStyle = {
      'top': 0,
      'font-size': '1.2rem',
    };
    Object.assign(this._placeholder.style, placeholderStyle);
  }

  // xử lý khi focus
  _addHandlerFocusInput() {
    this._searchInput.addEventListener('focus', this.handlerFocusInput.bind(this));
  }

  handlerBlurInput() {
    if (this._searchInput.value) {
      const placeholderStyle = {
        'top': 0,
        'font-size': '1.2rem',
      };
      Object.assign(this._placeholder.style, placeholderStyle);
    } else {
      const placeholderStyle = {
        'top': '1.2rem',
        'font-size': '1.6rem',
      };
      Object.assign(this._placeholder.style, placeholderStyle);
    }
  }

  // xử lý khi blur
  _addHandlerBlurInput() {
    this._searchInput.addEventListener('blur', this.handlerBlurInput.bind(this));
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // render card movie
  addHandlerRenderBanner(data) {
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._gridWrapper.innerHTML = '';
    // render nội dung mới
    this._gridWrapper.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="card__grid">${this._data.map(this._generateMarkupCard).join('')}</div>
      <div class="card__grid">${this._data.map(this._generateMarkupCard).join('')}</div>
    `;
  }

  _generateMarkupCard(movie) {
    return /*html */ `
      <div class="banner-card__item">
        <a href="#${movie.id}" class="movie__link">
          <img src="${pathPictureW220(movie.posterPath)}" class="movie__poster" loading="lazy" alt="${movie.title}">
          <div class="card__overlay"></div>
          <h6 class="movie__title">${movie.title}</h6>
        </a>
      </div>
    `;
  }
}

export default new BannerView();