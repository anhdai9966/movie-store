import View from '../View.js';

import { numberWithCommas } from '../../shared/helpers.js';

class XuView extends View {
  _parentElement = document.querySelector('.popup-buy__wrap-1-xu');

  constructor() {
    super();
  }

  renderXu(xu, bookmarks) {
    this._data = { xu, bookmarks };
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  hidden() {
    this._parentElement.classList.add('hidden');
  }
  shown() {
    this._parentElement.classList.remove('hidden');
  }

  addHandlerChange(handler) {
    this._parentElement.addEventListener('change', e => {
      const input = e.target.closest('.popup-buy__checkbox-xu');
      if (!input) return ;
      const price = input.dataset.price;
      input.checked? handler(price) : handler(0);
    })
  }

  _generateMarkup() {
    const buy = this._data.bookmarks.reduce((a, b) => (a + +b.price.buy), 0);

    return /*html */ `
      <div class="popup-buy__wrap-2">
        <h6 class="h6">Xu MovieStore</h6>
        <p>Dùng ${buy > this._data.xu ? numberWithCommas(this._data.xu) : numberWithCommas(buy)} xu / ${numberWithCommas(this._data.xu)} xu</p>
      </div>

      <div class="popup-buy__subWrap popup-buy__subWrap-xu">
        <label for="popup-buy__checkbox-xu">-${buy > this._data.xu ? numberWithCommas(this._data.xu) : numberWithCommas(buy)} đ</label>

        <input type="checkbox" name="xu" id="popup-buy__checkbox-xu" data-price="${buy > this._data.xu ? this._data.xu : buy}" class="popup-buy__checkbox-xu" />
      </div>
    `;
  }
}

export default new XuView();