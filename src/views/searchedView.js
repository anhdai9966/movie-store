import View from './View.js';
import icons from 'url:../images/icons.svg';

class SearchedView extends View {
  _parentElement = document.querySelector('.search__searched');

  addHandlerClickDelete(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__btn--remove');
      if (!btn) return ;
      const title = btn.dataset.title;
      handler(title);
    })
  }

  addHandlerClickSearched(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__btn-item');
      if (!btn) return ;
      const title = btn.dataset.title;
      handler(title);
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  
  _generateMarkupPreview(title, index) {
    // giới hạn get 3 item
    if (index > 2) return ;
    return /*html */ `
      <li class="search__item">
        <button data-title="${title}" class="search__btn-item">
          <svg class="search__icon">
            <use href="${icons}#icon-history"></use>
          </svg>

          <span>${title}</span>

        </button>

        <button data-title="${title}" class="search__btn search__btn--remove" title="Xóa tìm kiếm này">Xóa</button>
      </li>
    `;
  }
}

export default new SearchedView();
