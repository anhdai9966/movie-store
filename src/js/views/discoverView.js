class DiscoverView {
  _parentElement = document.querySelector('.discover__popup');

  constructor() {
    this._addHandlerShowDiscover();
    this._addHandlerCloseDiscover();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // thê xử lý hiển thị
  _addHandlerShowDiscover() {
    setTimeout(() => {
      this._parentElement.style.transform = 'translateX(0)';
    }, 2000);
  }
  handlerShowDiscover() {
    this._parentElement.style.transform = 'translateX(-380px)';
  }
  _addHandlerCloseDiscover() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn__close');
      if(!btn) return;
      this.handlerShowDiscover();
    })
  }
}

export default new DiscoverView();