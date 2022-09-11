import View from '../View.js';

class CardView extends View {
  _grandparentElement = document.querySelector('.filter')
  _filterResult = this._grandparentElement.querySelector('.filter__result');
  _parentElement = this._grandparentElement.querySelector('.filter__result-grid');

  _inputCountries = this._grandparentElement.querySelector('.filter__input-countries');
  _inputYear = this._grandparentElement.querySelector('.filter__input-year');

  _btnReset = this._grandparentElement.querySelector('.filter__form-btn--reset');
  _btnClose = this._grandparentElement.querySelector('.filter__form-btn--close');

  constructor() {
    super();
    this._addHandlerbtnReset();
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  shownResult() {
    this._filterResult.classList.remove('hidden');
    setTimeout(() => {
      this._filterResult.style.opacity = '1';
    }, 100);
  }
  hiddenResult() {
    this._filterResult.classList.add('hidden');
    this._filterResult.style.opacity = '0';
  }

  shownBtnReset() {
    this._btnReset.classList.remove('hidden');
  }
  hiddenbtnReset() {
    this._btnReset.classList.add('hidden');
  }
  shownInputCountries() {
    this._inputCountries.classList.remove('hidden');
  }
  hiddenInputCountries() {
    this._inputCountries.classList.add('hidden');
  }
  shownInputYear() {
    this._inputYear.classList.remove('hidden');
  }
  hiddenInputYear() {
    this._inputYear.classList.add('hidden');
  }

  addHandlerbtnClose(handler) {
    this._btnClose.addEventListener('click', handler);
  }
  _addHandlerbtnReset() {
    this._btnReset.addEventListener('click', () => {
      window.location.hash = '';
    });
  }
  addHandlerInputYear(handler) {
    this._inputYear.addEventListener('keypress', (e) => {
      if (e.key == 'Enter') {
        const value = this._inputYear.value;
        handler(value);
      }
    });
  }
  addHandlerInputCountries(handler) {
    this._inputCountries.addEventListener('input', (e) => {
      const value = this._inputCountries.value;
      handler(value);
    });
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(filter) {
    return /*html */ `
      <a href="#${filter.apiPro}&&${filter.subApiPro}${filter.id}" class="filter__result-item">${filter.name}</a>
    `;
  }
}

export default new CardView();