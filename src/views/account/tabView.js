class DetailNavView {
  _infoBtn = document.querySelector('.tab__btn-info');
  _myVideoBtn = document.querySelector('.tab__btn-my-video');
  _myWishlistBtn = document.querySelector('.tab__btn-my-wishlist');
  _myHistoryBtn = document.querySelector('.tab__btn-my-history');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  
  remoreAvtived() {
    this._infoBtn.classList.remove('tab__btn--actived');
    this._myVideoBtn.classList.remove('tab__btn--actived');
    this._myWishlistBtn.classList.remove('tab__btn--actived');
    this._myHistoryBtn.classList.remove('tab__btn--actived');
  }
  
  activeInfoBtn() {
    this._infoBtn.classList.add('tab__btn--actived');
  }
  activeMyVideoBtn() {
    this._myVideoBtn.classList.add('tab__btn--actived');
  }
  activeMyWishlistBtn() {
    this._myWishlistBtn.classList.add('tab__btn--actived');
  }
  activeMyHistoryBtn() {
    this._myHistoryBtn.classList.add('tab__btn--actived');
  }

  addHandlerInfoBtn(handler) {
    this._infoBtn.addEventListener('click', () => {
      handler();
    });
  }
  addHandlerMyVideoBtn(handler) {
    this._myVideoBtn.addEventListener('click', () => {
      handler();
    });
  }
  addHandlerMyWishlistBtn(handler) {
    this._myWishlistBtn.addEventListener('click', () => {
      handler();
    });
  }
  addHandlerMyHistoryBtn(handler) {
    this._myHistoryBtn.addEventListener('click', () => {
      handler();
    });
  }
};

export default new DetailNavView();