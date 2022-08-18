import homeView from './homeView';

class HomeCardView extends homeView {
  _parentElement = document.querySelector('.cardHome');
  _cardListElement = this._parentElement.querySelector('.card__list');
  _leftBtn = this._parentElement.querySelector('.left__btn');
  _rightBtn = this._parentElement.querySelector('.right__btn');


  constructor() {
    super();
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

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.card__btn--wishlist');
      if (!btn) return;
      const id = btn.dataset.id;
      handler(id);
    });
  }

  

  //  xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new HomeCardView();
