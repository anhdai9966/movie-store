import homeView from './homeView';

class HomeCard1m2View extends homeView {
  _parentElement = document.querySelector('.cardHome1-2');
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
}

export default new HomeCard1m2View();
