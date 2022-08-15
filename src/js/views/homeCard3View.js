import homeView from './homeView';

import icons from 'url:../../imgs/icons.svg';

class HomeCard3View extends homeView {
  _parentElement = document.querySelector('.cardHome3');
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

  render2Card(data) {
    this._data = data;

    let markup = this._generateMarkup2();
    this._cardListElement.innerHTML = '';
    // render nội dung mới
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
    // khi render ra thì thêm sự kiện
    this._addHandlerClickControlRight();
    this._addHandlerClickControlLeft();
  }

  _generateMarkup2() {
    return this._data.map(this._generateMarkupCard2).join('');
  }

  _generateMarkupCard2(trailer) {
    return /*html */ `
      <div class="card__item">
        <a href="#trailer/${trailer.videoId}" class="card__link">
          <img
            src="${trailer.thumbnails.high.url}"
            alt="${trailer.title}"
            loading="lazy"
            class="card__thumbnails"
          />
          <svg class="card__icon">
            <use href='${icons}#icon-play'></use>
          </svg>
          <p class="card__title">${trailer.title}</p>
        </a> 
      </div>
    `;
  }
}

export default new HomeCard3View();
