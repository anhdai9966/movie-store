import View from './View.js';

import icons from '../../imgs/icons.svg';

class SearchView extends View {
  _data;
  _parentElement = document.querySelector('.header__search');
  _searchForm = this._parentElement.querySelector('.search__form');
  _searchInput = this._parentElement.querySelector('.form__input');

  _searchedList = this._parentElement.querySelector('.search__searched');
  _suggestList = this._parentElement.querySelector('.search__suggest');
  _suggestWrapper = this._parentElement.querySelector('.suggest__wrapper');


  constructor() {
    super();
    this._addHandlerScrollTopShowHeader();
    // this._addHandlerCickShowSearch();
  }

  addHandlerShowSearch(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler))
  }

  getQuery() {
    const query = this._searchInput.value;
    // this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchInput.value = '';
  }

  addHandlerSearchInput(handler) {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    this._searchInput.addEventListener('input', function (e) {
      e.preventDefault();
      setTimeout(() => {
        handler();
      }, 700);
    });
  }

  addHandlerRenderResultSearch(data) {
    this._data = data


    const markup = this._generateMarkup();

    this._searchedList.innerHTML = '';
    this._searchedList.insertAdjacentHTML('afterbegin', markup)
  }
  
  addHandlerSearchListClear() {
    this._searchedList.innerHTML = '';
  }

  addHandlerHiddenPopularList() {
    if (!this._suggestWrapper.classList.contains('hidden')) {
      this._suggestWrapper.classList.add('hidden');
    };
  }
  addHandlerShowPopularList() {
    if (this._suggestWrapper.classList.contains('hidden')) {
      this._suggestWrapper.classList.remove('hidden');
    };
  }


  // thê xử lý hiển thị search
  addHandlerShowSearch() {
    if (!this._parentElement.classList.contains('hidden')) {
      this._parentElement.classList.add('hidden');
      document.body.style.overflow = 'auto';
    } else {
      this._parentElement.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };
  }
  _addHandlerCickShowSearch() {
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__btn--toggle');
      if(btn) return ;
      this._parentElement.classList.add('hidden');
      this._suggestWrapper.classList.remove('hidden');
      document.body.style.overflow = 'auto';
    })
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent, height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      if (!this._parentElement.classList.contains('hidden')) {
        if(height < heightCurrent) {
          this._parentElement.style.top = "-380px";
          height = heightCurrent;
        } else {
          this._parentElement.style.top = "54px";
          height = heightCurrent;
        };
      }
    });
  }

  addHandlerSuggest(data) {
    this._data = data

    const markup = this._generateMarkup();

    this._suggestList.innerHTML = '';
    this._suggestList.insertAdjacentHTML('afterbegin', markup)
  }

  _generateMarkup() {
    // giới hạn tìm kiếm
    return this._data.map(this._generateMarkupSearch).join('');
  }

  _generateMarkupSearch(movie, index) {
    if (index > 5) return ;
    return /*html */ `
      <li class="search__item">
        <a href="./detail.html#${movie.id}" class="search__link">
          <svg class="search__icon">
            <use href="${icons}#icon-search"></use>
          </svg>
          <span>${movie.title}</span>
        </a>
      </li>
    `;
  }
}

export default new SearchView();
