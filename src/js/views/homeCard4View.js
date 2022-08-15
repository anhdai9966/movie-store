import homeView from './homeView';

import { pathPictureW235 } from '../shared/helpers.js';

class HomeCard4View extends homeView {
  _parentElement = document.querySelector('.cardHome4');
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

  _generateMarkupCard2(people) {
    return /*html */ `
      <div class="card__item">
        <a href="#" class="card__link">
          <img
            src="${pathPictureW235(people.profilePath)}"
            alt="${people.name}"
            loading="lazy"
            class="card__poster"
          />
          <p class="card__title">${people.name}</p>
          <p class="card__info">${people.knownFor.map(tit => `<span>${tit.title}</span>`).join(', ')}</p>
        </a> 
      </div>
    `;
  }
}

export default new HomeCard4View();