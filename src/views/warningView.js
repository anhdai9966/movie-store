import View from './View.js';

class WarningView extends View {
  _parentElement = document.querySelector('.warning');

  constructor() {
    super();
    this._handlerCloseWarning();
    this._handlerCloseWarningOverlay();
  }

  addhandlerWarningToggle() {
    this._parentElement.classList.toggle('hidden');
    if (this._parentElement.classList.contains('hidden')) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    };
  }

  _handlerCloseWarning() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.warning__cancel');
      if (!btn) return ;
      this.addhandlerWarningToggle();
    })
  }
  _handlerCloseWarningOverlay() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.warning__overlay');
      if (!btn) return ;
      this.addhandlerWarningToggle();
    })
  }
  
  addHandlerClickOk(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.warning__ok');
      if (!btn) return ;
      handler();
    })
  }

  _generateMarkup() {
    return /*html*/ `
      <div class="warning__overlay"></div>
      <div class="warning__wrapper">
        <h6 class="warning__title">${this._data}</h6>
        <div class="warning__btn">
          <button class="btn-secondary warning__cancel">Đóng</button>
          <button class="btn-primary warning__ok">OK</button>
        </div>
      </div>
    `;
  }
}

export default new WarningView();