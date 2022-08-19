import { numberWithCommas } from '../shared/helpers.js';

class PopupWishlistBuyView {
  _data;
  _xu;
  _parrentElement = document.querySelector('.wishlistBuy__pay_wrapper');

  constructor() {
    
  }

  addHandlerShownWishlistBtn() {
    this._parrentElement.classList.remove('hidden');
  }
  addHandlerHiddennWishlistBtn() {
    this._parrentElement.classList.add('hidden');
  }

  addHandlerClickBtnBuy(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlistBuy__btn--buy');
      if (!btn) return ;
      const price = btn.dataset.price;
      handler(price);
    })
  }

  addHandlerClickBtnRent(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlistBuy__btn--rent');
      if (!btn) return ;
      const price = btn.dataset.price;
      handler(price);
    })
  }

  render(data, xu = 0) {
    this._data = data;
    this._xu = xu;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parrentElement.innerHTML = '';
    // render nội dung mới
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    // tính giá trừ
    let totalPieceBuy = 0;
    let totalPieceRent = 0;
    this._data.forEach(movie => {
      totalPieceBuy += movie.price.buy;
      totalPieceRent += movie.price.rent;
    })
    return /*html */ `
      
      <div class="wishlistBuy__xu_wrap">
        <h6>Tổng thanh toán</h6>
        <p style="margin-top: -2px;">(${this._data.length} phim):</p>
      </div>

      <div class="wishlistBuy__pay_wrap_2">
        <div class="wishlistBuy__pay_wrap">
          <h6 class="h6">${numberWithCommas(totalPieceBuy - this._xu)} đ</h6>
          <button data-price="${numberWithCommas(totalPieceBuy - this._xu)}" class="buy__btn wishlistBuy__pay_btn wishlistBuy__btn--buy">Mua</button>
        </div>
        <div class="wishlistBuy__pay_wrap">
          <h6 class="h6">${numberWithCommas(totalPieceRent - this._xu) >= 0 ? numberWithCommas(totalPieceRent - this._xu) : 0} đ</h6>
          <button data-price="${numberWithCommas(totalPieceRent - this._xu) >= 0 ? numberWithCommas(totalPieceRent - this._xu) : 0}" class="rent__btn wishlistBuy__pay_btn wishlistBuy__btn--rent">Thuê</button>
        </div>
      </div>
    `;
  }
}

export default new PopupWishlistBuyView();