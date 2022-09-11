class DiscoverView {
  _parentElement = document.querySelector('.discover');

  constructor() {
    this._addHandlerClose();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // thê xử lý hiển thị
  addHandlerShown() {
    setTimeout(() => {
      this._parentElement.style.transform = 'translateX(0)';
    }, 2000);
  }

  addHandlerHidden() {
    this._parentElement.style.transform = 'translateX(-380px)';
  }

  _addHandlerClose() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn__close');
      if(!btn) return;

      this.addHandlerHidden();
    })
  }
}

export default new DiscoverView();