import homeView from './homeView';

import { randomColor } from '../shared/helpers.js';

class HomeCard5View extends homeView {
  _parentElement = document.querySelector('.cardHome5');
  _genresbtnShow = document.querySelector('.popup-genres__btn-show');
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

  addHandlerShowPopup(handler) {
    this._genresbtnShow.addEventListener('click', () => handler());
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

  _generateMarkupCard2(genre) {
    return /*html */ `
      <div class="card__item">
        <a href="#" class="card__link" style="background: linear-gradient(222deg, ${randomColor()} 0%, ${randomColor()} 100%);">
          <p class="card__title">${genre.name}</p>
        </a> 
      </div>
    `;
  }
}

export default new HomeCard5View();