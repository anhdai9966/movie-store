class SearchView {
  _parentElement = document.querySelector('.search');
  _overlayElement = this._parentElement.previousElementSibling;
  _searchForm = this._parentElement.querySelector('.search__form');
  _searchInput = this._parentElement.querySelector('.search__input');

  _result = this._parentElement.querySelector('.search__result');
  _searched = this._parentElement.querySelector('.search__searched');
  _suggest = this._parentElement.querySelector('.search__suggest');

  constructor() {
    this._addHandlerClickOverlay();
    this._addHandlerScrollSearch();
  }

  containsSearch() {
    return this._parentElement.classList.contains('hidden');
  }

  toggleSearch() {
    this._parentElement.classList.toggle('hidden');
    this._overlayElement.classList.toggle('hidden');
    this._searchInput.focus();
  }
  closeSearch() {
    this._parentElement.classList.add('hidden');
    this._overlayElement.classList.add('hidden');
  }
  _addHandlerClickOverlay() {
    this._overlayElement.addEventListener('click', this.toggleSearch.bind(this));
  }
  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollSearch() {
    let heightCurrent,
      height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      if (!this._parentElement.classList.contains('hidden')) {
        if (height < heightCurrent) {
          this._parentElement.style.top = '-590px';
          height = heightCurrent;
        } else {
          this._parentElement.style.top = '54px';
          height = heightCurrent;
        }
      }
    });
  }

  shownResult() {
    this._result.classList.remove('hidden');
    this._searched.classList.add('hidden');
    this._suggest.classList.add('hidden');
  }
  hiddenResult() {
    this._result.classList.add('hidden');
    this._searched.classList.remove('hidden');
    this._suggest.classList.remove('hidden');
  }

  getQuery() {
    const query = this._searchInput.value;
    return query;
  }

  setQuery(value) {
    this._searchInput.value = value;
  }

  clearQuery() {
    this._searchInput.value = '';
  }

  addHandlerSubmit(handler) {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dataArr = new FormData(this._searchForm);
      const data = Object.fromEntries(dataArr);
      handler(data.search);
    })
  }
  addHandlerSearchInput(handler) {
    this._searchInput.addEventListener('input', function (e) {
      e.preventDefault();

      setTimeout(() => {
        handler();
      }, 700);
    });
  }
}

export default new SearchView();
