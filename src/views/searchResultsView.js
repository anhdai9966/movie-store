import View from './View.js';
import icons from 'url:../images/icons.svg';

class SearchSeggestView extends View {
  _parentElement = document.querySelector('.search__result');

  addHandlerClickSearchItem(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__item');
      if (!btn) return ;
      handler();
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie, index) {
    if (index > 5) return ;
    return /*html */ `
      <li class="">
        <a href="./detail.html#${movie.id}" class="header__link search__item">
          <svg class="search__icon">
            <use href="${icons}#icon-search"></use>
          </svg>

          <span>${movie.title}</span>
        </a>
      </li>
    `;
  }
}

export default new SearchSeggestView();
