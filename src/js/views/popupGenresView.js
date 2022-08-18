class HopupGenres {
  _parentElement = document.querySelector('.genres__popup');
  _genresList = this._parentElement.querySelector('.genres__list');
  _data;

  constructor() {
    this._addHandlerClosePopup();
    this._addHandlerClickClose();
  }

  //  xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerTogglePopup() {
    this._parentElement.classList.toggle('hidden');
    setTimeout(() => {
    if (this._parentElement.classList.contains('hidden')) {
        this._parentElement.firstElementChild.style.top = '55%';
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
        this._parentElement.firstElementChild.style.top = '50%';
      };
    }, 10);
  }

  _addHandlerClosePopup() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('btn__close');
      if(!btn) return ;
      this.addHandlerTogglePopup();
    });
  }
  
  _addHandlerClickClose() {
    this._parentElement.addEventListener('click', () => this.addHandlerTogglePopup());
  }

  renderPopup(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._genresList.innerHTML = '';
    this._genresList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupItem).join('');
  }

  _generateMarkupItem(item) {
    return /*html */ `
      <a href="#with_genres=${item.id}" class="genres__item">${item.name}</a>
    `;
  }
}

export default new HopupGenres();
