import View from './View.js';

class PopupGenresView extends View {
  _grandparentElement = document.querySelector('.genres__popup');
  _parentElement = document.querySelector('.genres__list');

  constructor() {
    super();
    this._addHandlerClickBtn();
    this._addHandlerCloseOverlay();
  }

  //  xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  togglePopup() {
    this._grandparentElement.classList.toggle('hidden');

    setTimeout(() => {
      if (this._grandparentElement.classList.contains('hidden')) {
        this._parentElement.parentElement.style.top = '55%';
        document.body.style.overflow = 'auto';
      } else {
        this._parentElement.parentElement.style.top = '50%';
        document.body.style.overflow = 'hidden';
      }
    }, 10);
  }

  _addHandlerClickBtn() {
    this._grandparentElement.addEventListener('click', e => {
      const btn = e.target.closest('.genres__btn--close');
      if (!btn) return;

      this.togglePopup();
    });
  }
  _addHandlerCloseOverlay() {
    this._grandparentElement.addEventListener('click', e => {
      const btn = e.target.closest('.genres__overlay');
      if (!btn) return;

      this.togglePopup();
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(item) {
    return /*html */ `
      <a href="#with_genres=${item.id}" class="genres__item">${item.name}</a>
    `;
  }
}

export default new PopupGenresView();
