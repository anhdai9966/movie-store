class BannerSearchView {
  _searchForm = document.querySelector('.banner__form--search');
  _textSearch = document.querySelector('#text__search');

  addHandlerSubmit(handler) {
    this._searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let value = this._textSearch.value;
      console.log('🚀 ~ BannerSearchView ~ this._searchForm.addEventListener ~ value', value)
      handler(value);
    })
  }
}

export default new BannerSearchView();