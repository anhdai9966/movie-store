class FilterView {
  _parentElement = document.querySelector('.filter__list');

  _filterSortAsc = this._parentElement.querySelector('.filter__sort-asc');
  _filterSortDesc = this._parentElement.querySelector('.filter__sort-desc');
  _filterSortReset = this._parentElement.querySelector('.filter__sort-reset');
  _filterYear = this._parentElement.querySelector('.filter__year');
  _filterGenres = this._parentElement.querySelector('.filter__genres');
  _filterCountries = this._parentElement.querySelector('.filter__countries');

  notActiveAll() {
    if (this._filterSortAsc.classList.contains('filter__link--actived')) {
      this._filterSortAsc.classList.remove('filter__link--actived');
    }
    if (this._filterYear.classList.contains('filter__btn--actived')) {
      this._filterYear.classList.remove('filter__btn--actived');
    }
    if (this._filterGenres.classList.contains('filter__btn--actived')) {
      this._filterGenres.classList.remove('filter__btn--actived');
    }
    if (this._filterCountries.classList.contains('filter__btn--actived')) {
      this._filterCountries.classList.remove('filter__btn--actived');
    }
  }
  shownSortAsc() {
    this._filterSortAsc.classList.remove('hidden');
    this._filterSortDesc.classList.add('hidden');
    this._filterSortReset.classList.add('hidden');
  }
  shownSortDesc() {
    this._filterSortAsc.classList.add('hidden');
    this._filterSortDesc.classList.remove('hidden');
    this._filterSortReset.classList.add('hidden');
  }
  shownSortReset() {
    this._filterSortAsc.classList.add('hidden');
    this._filterSortDesc.classList.add('hidden');
    this._filterSortReset.classList.remove('hidden');
  }
  activedYear() {
    this._filterYear.classList.add('filter__btn--actived');
  }
  activedGenres() {
    this._filterGenres.classList.add('filter__btn--actived');
  }
  activedCountries() {
    this._filterCountries.classList.add('filter__btn--actived');
  }

  addHandlerClickSortAsc(handler) {
    this._filterSortAsc.addEventListener('click', handler);
  }
  addHandlerClickSortDesc(handler) {
    this._filterSortDesc.addEventListener('click', handler);
  }
  addHandlerClickSortReset(handler) {
    this._filterSortReset.addEventListener('click', handler);
  }
  addHandlerClickYear(handler) {
    this._filterYear.addEventListener('click', handler);
  }
  addHandlerClickGenres(handler) {
    this._filterGenres.addEventListener('click', handler);
  }
  addHandlerClickCountries(handler) {
    this._filterCountries.addEventListener('click', handler);
  }
}

export default new FilterView();