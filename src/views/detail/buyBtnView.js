import View from '../View.js';

import { numberWithCommas } from '../../shared/helpers.js';

class BuyBtnView extends View {
  _parentElement = document.querySelector('.popup-buy__wrap-1-btn');

  constructor() {
    super();
  }

  renderBtn(bookmarks, xu = 0) {
    this._data = {bookmarks, xu};
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerBuy(handler) {
    this._parentElement.addEventListener('click', e => {
      const input = e.target.closest('.popup-buy__btn--buy');
      if (!input) return ;
      const price = input.dataset.price;
      handler(price);
    })
  }
  addHandlerRent(handler) {
    this._parentElement.addEventListener('click', e => {
      const input = e.target.closest('.popup-buy__btn--rent');
      if (!input) return ;
      const price = input.dataset.price;
      handler(price);
    })
  }

  hidden() {
    this._parentElement.classList.add('hidden');
  }
  shown() {
    this._parentElement.classList.remove('hidden');
  }

  _generateMarkup() {
    const totalRent = this._data.bookmarks.reduce((a, b) => (a + +b.price.rent), 0) - this._data.xu

    return /*html */ `
      <div class="popup-buy__wrap-2">
        <h6>Tổng thanh toán</h6>
        <p>(${this._data.bookmarks.length} phim):</p>
      </div>

      <div class="popup-buy__wrap-2 popup-buy__wrap-2-btn">
        <div class="popup-buy__subWrap">
          <h6 class="">${numberWithCommas(this._data.bookmarks.reduce((a, b) => (a + +b.price.buy), 0) - this._data.xu)} đ</h6>
          <button data-price="${this._data.bookmarks.reduce((a, b) => (a + +b.price.buy), 0) - this._data.xu}" class="btn-primary popup-buy__btn popup-buy__btn--buy">Mua</button>
        </div>

        <div class="popup-buy__subWrap">
          <h6 class="">${totalRent < 0 ? 0 : numberWithCommas(totalRent)} đ</h6>
          <button data-price="${totalRent < 0 ? 0 : totalRent}" class="btn-secondary popup-buy__btn popup-buy__btn--rent">Thuê</button>
        </div>
      </div>
    `;
  }
}

export default new BuyBtnView();