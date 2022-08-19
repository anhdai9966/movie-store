import icons from 'url:../../imgs/icons.svg';

class SearchedView {
  _data;
  _parentElement = document.querySelector('.search__searched');

  render(data) {
    this._data = data

    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerShowSearched() {
    if (this._parentElement.classList.contains('hidden')) {
      this._parentElement.classList.remove('hidden');
    };
  }
  addHandlerHiddenSearched() {
    if (!this._parentElement.classList.contains('hidden')) {
      this._parentElement.classList.add('hidden');
    };
  }

  addHandlerClickDelete(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__btn--remove');
      if (!btn) return ;
      const title = btn.dataset.title;
      handler(title);
    })
  }

  addHandlerSearchedClick(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.searched__click');
      if (!btn) return ;
      const title = btn.dataset.title;
      handler(title);
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupSearched).join('');
  }
  
  _generateMarkupSearched(movie, index) {
    // giới hạn get 3 item
    if (index > 2) return ;
    return /*html */ `
      <li class="search__item">
        <button data-title="${movie.title}" class="search__link searched__click">
          <svg class="search__icon">
            <use href="${icons}#icon-history"></use>
          </svg>
          <span>${movie.title}</span>
        </button>
        <button data-title="${movie.title}" class="search__btn search__btn--remove" title="Xóa tìm kiếm này">Xóa</button>
      </li>
    `;
  }
}

export default new SearchedView();
