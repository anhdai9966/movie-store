import View from './View.js';

import icons from 'url:../../imgs/icons.svg';

class SearchView extends View {
  _data;
  _parentElement = document.querySelector('.header__search');
  _searchForm = this._parentElement.querySelector('.search__form');
  _searchInput = this._parentElement.querySelector('.form__input');
  _header = document.querySelector('.header');
  _searcheResults = this._parentElement.querySelector('.search__results');
  _suggestList = this._parentElement.querySelector('.search__suggest');
  _suggestWrapper = this._parentElement.querySelector('.suggest__wrapper');


  constructor() {
    super();
    this._addHandlerScrollTopShowHeader();
    // this._addHandlerCickShowSearch();
  }

  getQuery() {
    const query = this._searchInput.value;
    // this._clearInput();
    return query;
  }

  setQuery(value) {
    this._searchInput.value = value;
  }

  _clearInput() {
    this._searchInput.value = '';
  }

  addHandlerSearchInput(handler) {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    })
      this._searchInput.addEventListener('input', function () {
        setTimeout(() => {
          handler();
        }, 700);
      });
  }
  addHandlerChangeInput(handler) {
    this._searchInput.addEventListener('change', function () {
      setTimeout(() => {
        handler();
      }, 700);
    });
  }

  addHandlerRenderResultSearch(data) {
    this._data = data

    const markup = this._generateMarkups2();

    this._searcheResults.innerHTML = '';
    this._searcheResults.insertAdjacentHTML('afterbegin', markup)
  }
  
  addHandlerSearchListClear() {
    this._searcheResults.innerHTML = '';
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
  addHandlerHiddenSeachResult() {
    if (!this._searcheResults.classList.contains('hidden')) {
      this._searcheResults.classList.add('hidden');
    };
  }
  addHandlerShowSeachResult() {
    if (this._searcheResults.classList.contains('hidden')) {
      this._searcheResults.classList.remove('hidden');
    };
  }

  // thê xử lý hiển thị search
  addHandlerShowSearch() {
    if (!this._parentElement.classList.contains('hidden')) {
      this._parentElement.classList.add('hidden');
      document.body.style.overflow = 'auto';
    } else {
      this._parentElement.classList.remove('hidden');
    };
  }
  handlerShowSearch() {
    this._parentElement.classList.add('hidden');
  }
  _addHandlerCickShowSearch() {
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.search__btn--toggle');
      if(btn) return ;
      this._parentElement.classList.add('hidden');
      this._suggestWrapper.classList.remove('hidden');

    })
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent, height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      if (!this._parentElement.classList.contains('hidden')) {
        if(height < heightCurrent) {
          this._parentElement.style.top = "-590px";
          height = heightCurrent;
        } else {
          this._parentElement.style.top = "54px";
          height = heightCurrent;
        };
        if (heightCurrent == 0) {
          this._header.style.background = '#181818';
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

  addHandlerClickSearched(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.searched__link');
      if (!btn) return ;
      handler();
    })
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
  _generateMarkups2() {
    // giới hạn tìm kiếm
    return this._data.map(this._generateMarkupSearchs2).join('');
  }

  _generateMarkupSearchs2(movie, index) {
    if (index > 5) return ;
    return /*html */ `
      <li class="search__item">
        <a href="./detail.html#${movie.id}" class="search__link searched__link">
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
