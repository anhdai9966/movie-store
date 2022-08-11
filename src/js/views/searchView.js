import View from './View.js';

import icons from 'url:../../imgs/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search__main');

  addHandlerToggleSearch() {
    this._parentElement.classList.toggle('show');

  }

  _generateMarkup() {
    return /*html */ `
      <div class="search__popup">
        <div class="container">
          <form class="search__form">
            <input type="text" placeholder="Tìm kiếm....." class="search__input" />
            <button class="cancel__btn">Hủy</button>

            <svg class="search__icon">
              <use href="${icons}#icon-search"></use>
            </svg>

            <button class="clear__btn clear__btn--clear" title="Xóa tất cả">
              <svg class="dismiss__icon">
                <use href="${icons}#icon-dismiss"></use>
              </svg>
            </button>
          </form>

          <ul class="search__searched">
            <li class="search__item">
              <a href="#" class="search__link">
                <svg class="search__icon">
                  <use href="${icons}#icon-history"></use>
                </svg>
                <span>Anh hùng</span>
              </a>
              <button class="search__btn search__btn--remove" title="Xóa tìm kiếm này">Xóa</button>
            </li>
            <li class="search__item">
              <a href="#" class="search__link">
                <svg class="search__icon">
                  <use href="${icons}#icon-history"></use>
                </svg>
                <span>Anh hùng</span>
              </a>
              <button class="search__btn search__btn--remove" title="Xóa tìm kiếm này">Xóa</button>
            </li>
          </ul>

          <p class="suggest__title">
            <svg class="search__icon">
              <use href="${icons}#icon-trending"></use>
            </svg>
            <span>Phim thịnh hành</span>
          </p>

          <ul class="search__suggest">
            <li class="search__item">
              <a href="#" class="search__link">
                <svg class="search__icon">
                  <use href="${icons}#icon-search"></use>
                </svg>
                <span>Thế giới khủng long: Lãnh địa</span>
              </a>
            </li>
            <li class="search__item">
              <a href="#" class="search__link">
                <svg class="search__icon">
                  <use href="${icons}#icon-search"></use>
                </svg>
                <span>Thế giới khủng long: Lãnh địa</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}

export default new SearchView();